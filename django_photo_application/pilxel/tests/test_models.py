from django.test import TestCase
from pilxel.models import ImageModel
from django.contrib.auth.models import User


class ImageModelTestCase(TestCase):
    """Tests for the Image model"""
    def setUp(self):
        user = User.objects.create(username='malikwahab', password='malikwahab')
        ImageModel.objects.create(name='Adventure', owner=user)

    def test_image_model(self):
        user = User.objects.all()[0]
        image_object = ImageModel.objects.all()[0]
        self.assertEqual(image_object.owner, user)
        self.assertEqual(image_object.name, "Adventure")
        self.assertEqual(ImageModel.objects.count(), 1)
