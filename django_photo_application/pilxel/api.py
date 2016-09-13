import json
from io import BytesIO

from django.core.files.base import ContentFile
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import filters, permissions, status, viewsets, mixins
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from allauth.socialaccount.providers.facebook.views import \
    FacebookOAuth2Adapter
from image_transformation.enhancement import Enhancement
from image_transformation.filters import FilterImage
from image_transformation.manipulate import ManipulateImage
from PIL import Image
from pilxel.filters import IsImageOwnerFilter, IsFolderOwnerFilter
from pilxel.models import ImageModel, FolderModel
from pilxel.permissions import IsOwner, IsImageOwner
from pilxel.serializers import ImageSerializer, FolderSerializer
from rest_auth.registration.views import SocialLoginView


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class ImageViewSet(viewsets.ModelViewSet):

    queryset = ImageModel.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser,)
    filter_backends = (filters.SearchFilter, IsImageOwnerFilter)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def retrieve(self, request, pk):
        queryset = ImageModel.objects.all()
        image_obj = get_object_or_404(queryset, pk=pk)
        image = Image.open(image_obj.image)
        image_format = image.format
        width = request.GET.get('width')
        height = request.GET.get('height')
        if width and height:
            image = image.resize((int(width), int(height)))
        return ImageViewSet.save_to_response(image, image_format)

    @staticmethod
    def save_to_response(image, image_format):
        response = HttpResponse(content_type='image/{}'.format(image_format))
        image.save(response, image_format)
        return response

    def update(self, request, pk):
        queryset = self.get_queryset()
        image_obj = get_object_or_404(queryset, pk=pk)
        # checks if user has object permissions
        self.check_object_permissions(self.request, image_obj)
        image = Image.open(image_obj.image)
        image_format = image.format
        image = image.copy()
        json_data = json.loads(request.body)
        manipulate = json_data.get('manipulate')
        enhance = json_data.get('enhance')
        image_filter = json_data.get('filter')
        save = json_data.get('save')
        output = None
        if manipulate:
            output = ManipulateImage(image)
            output = output.manipulate(manipulate)
        if enhance:
            output = Enhancement(image)
            output = output.enhance(enhance)
        if image_filter:
            output = FilterImage(image)
            output = output.filter(image_filter)
        if save and output:
            new_image = BytesIO()
            output.save(new_image, image_format)
            image_obj.image.save(image_obj.image.name,
                                 ContentFile(new_image.getvalue()))
        if output:
            return ImageViewSet.save_to_response(output, image_format)
        response = Response()
        response.status_code = status.HTTP_400_BAD_REQUEST
        return response


class ImageDetailsViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):

    queryset = ImageModel.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsImageOwner)

    def retrieve(self, request, pk):
        queryset = ImageModel.objects.all()
        image_obj = get_object_or_404(queryset, pk=pk)
        image = Image.open(image_obj.image)
        image_details = {
            "name": image_obj.name,
            "size": ImageDetailsViewSet.format_bytes(image_obj.image.size),
            "width": image.width,
            "height": image.height,
            "date_created": image_obj.date_created,
            "date_modified": image_obj.date_modified,
        }
        response = Response()
        response.data = image_details
        response.status_code = status.HTTP_200_OK
        return response

    @staticmethod
    def format_bytes(bytes_num):
        sizes = ["B", "Kb", "Mb"]
        i = 0
        dblbyte = bytes_num
        while (i < len(sizes) and bytes_num >= 1024):
            dblbyte = bytes_num / 1024.0
            i = i + 1
            bytes_num = bytes_num / 1024
        return str(round(dblbyte, 2)) + " " + sizes[i]


class FolderViewSet(viewsets.ModelViewSet):

    queryset = FolderModel.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    filter_backends = (filters.SearchFilter, IsFolderOwnerFilter, )
    serializer_class = FolderSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
