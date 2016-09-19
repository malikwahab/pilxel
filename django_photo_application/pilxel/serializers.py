from rest_framework import serializers
from pilxel.models import ImageModel, FolderModel


class ImageSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')
    image = serializers.ImageField(write_only=True, required=False)
    url = serializers.HyperlinkedIdentityField(view_name='image-detail',
                                               format='html')

    def create(self, validated_data):
        if not validated_data.get("name") or not validated_data.get("image"):
            raise serializers.ValidationError("Name cannot be empty")
        return super(ImageSerializer, self).create(validated_data)

    class Meta:
        model = ImageModel
        fields = ('id', 'url', 'name', 'date_modified', 'date_created',
                  'owner', 'image', 'folder',)


class FolderSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')
    images = ImageSerializer(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='folder-detail',
                                               format='html')

    def create(self, validated_data):
        if not validated_data.get("name"):
            raise serializers.ValidationError("Name cannot be empty")
        return super(FolderSerializer, self).create(validated_data)

    class Meta:
        model = FolderModel
        fields = ('id', 'url', 'name', 'date_modified', 'date_created',
                  'owner', 'images',)
