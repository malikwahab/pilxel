from pilxel.image_transformation.manipulate import Image, ManipulateImage
from PIL import Image as PILImage
from unittest import TestCase
import mock
from io import BytesIO
from django.core.files import File


class TestManipulateImage(TestCase):

    def setUp(self):
        self.image_obj = Image.new("RGBA", size=(50, 50), color=(255, 0, 0, 1))
        self.mock_image_object = mock.create_autospec(self.image_obj)
        self.image_manipulate = ManipulateImage(self.mock_image_object)

    def test_crop_image(self):
        data = {
            "crop": {
                "left": 0,
                "upper": 0,
                "right": 30,
                "lower": 30
            }
        }
        self.image_manipulate.manipulate(data=data)
        self.mock_image_object.crop.assert_called_with((0, 0, 30, 30))

    def test_resize_image(self):
        data = {
            "resize": {
                "width": 20,
                "height": 20
            }
        }
        self.image_manipulate.manipulate(data=data)
        self.mock_image_object.resize.assert_called_with((20, 20))

    def test_filp_image(self):
        data = {
            "flip": {
                "mirror": True,
                "top_bottom": True
            }
        }
        self.image_manipulate.manipulate(data=data)
        self.mock_image_object.transpose.assert_called_with((PILImage.FLIP_LEFT_RIGHT))

    def test_rotate_image(self):
        data = {
            "rotate": 260
        }
        self.image_manipulate.manipulate(data=data)
        self.mock_image_object.rotate.assert_called_with(260)
