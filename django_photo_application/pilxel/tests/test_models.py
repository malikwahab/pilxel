from django.contrib.auth.models import User
from django.test import TestCase

from pilxel.models import FolderModel, ImageModel


class ImageModelTestCase(TestCase):
    """Tests for the Image model"""

    def setUp(self):
        user = User.objects.create(
            username='malikwahab', password='malikwahab')
        ImageModel.objects.create(name='Adventure', owner=user)

    def test_image_model(self):
        user = User.objects.all()[0]
        image_object = ImageModel.objects.all()[0]
        self.assertEqual(image_object.owner, user)
        self.assertEqual(image_object.name, "Adventure")
        self.assertEqual(ImageModel.objects.count(), 1)


class FolderModelTestCase(TestCase):
    """Tests for the Folder model"""

    def setUp(self):
        user = User.objects.create(
            username='malikwahab', password='malikwahab')
        FolderModel.objects.create(name='Adventure', owner=user)

    def test_image_model(self):
        user = User.objects.all()[0]
        folder_object = FolderModel.objects.all()[0]
        self.assertEqual(folder_object.owner, user)
        self.assertEqual(folder_object.name, "Adventure")
        self.assertEqual(FolderModel.objects.count(), 1)
