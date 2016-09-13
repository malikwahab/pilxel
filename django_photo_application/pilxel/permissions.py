from rest_framework import permissions
from pilxel.models import ImageModel


class IsImageOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        image = ImageModel.objects.get(id=view.kwargs['pk'])
        return self.has_object_permission(request, view, image)

    def has_object_permission(self, request, views, obj):
        return obj.owner == request.user


class IsOwner(permissions.BasePermission):
    """Ensure all allowed access is of the object owner."""

    def has_object_permission(self, request, views, obj):
        return obj.owner == request.user
