from __future__ import unicode_literals

from django.db import models


# Create your models here.


def upload_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/images/user_<id>
    return 'images/user_{0}_{1}/'.format(instance.owner.id, filename)


class BaseModel(models.Model):

    name = models.CharField(max_length=100, unique=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('date_modified',)
        abstract = True


class FolderModel(BaseModel):

    owner = models.ForeignKey('auth.User', related_name='folder')


class ImageModel(BaseModel):

    owner = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        upload_to=upload_directory_path, blank=True, null=True)
    folder = models.ForeignKey(FolderModel, on_delete=models.CASCADE,
                               related_name='images', blank=True, null=True)
