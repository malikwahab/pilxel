from pilxel.image_transformation.enhancement import Enhancement, ImageEnhance
from unittest import TestCase
import mock
from io import BytesIO
from PIL import Image
from django.core.files import File


class TestEnhancement(TestCase):

    def setUp(self):
        self.image_obj = Image.new("RGBA", size=(50, 50), color=(255, 0, 0, 1))

    @mock.patch.object(ImageEnhance.Brightness, "enhance", autospec=True)
    def test_brightness_enhancement(self, mock_brightness):
        enhancement = Enhancement(self.image_obj)
        enhancement.enhance({"brightness": 0.7})
        self.assertTrue(mock_brightness.called)

    @mock.patch.object(ImageEnhance.Contrast, "enhance", autospec=True)
    def test_contrast_enhancement(self, mock_contrast):
        enhancement = Enhancement(self.image_obj)
        enhancement.enhance({"contrast": 0.5})
        self.assertTrue(mock_contrast.called)

    @mock.patch.object(ImageEnhance.Sharpness, "enhance", autospec=True)
    def test_sharpness_enhancement(self, mock_sharpness):
        enhancement = Enhancement(self.image_obj)
        enhancement.enhance({"sharpness": 0.5})
        self.assertTrue(mock_sharpness.called)

    @mock.patch.object(ImageEnhance.Color, "enhance", autospec=True)
    def test_color_enhancement(self, mock_color):
        enhancement = Enhancement(self.image_obj)
        enhancement.enhance({"color": 0.5})
        self.assertTrue(mock_color.called)

    @mock.patch.object(ImageEnhance.Brightness, "enhance", autospec=True)
    @mock.patch.object(ImageEnhance.Contrast, "enhance", autospec=True)
    @mock.patch.object(ImageEnhance.Sharpness, "enhance", autospec=True)
    @mock.patch.object(ImageEnhance.Color, "enhance", autospec=True)
    def test_invalid_call(self, mock_color, mock_sharpness, mock_contrast, mock_brightness):
        enhancement = Enhancement(self.image_obj)
        enhancement.enhance({"invalid": 0.5})

        self.assertFalse(mock_color.called)
        self.assertFalse(mock_contrast.called)
        self.assertFalse(mock_sharpness.called)
        self.assertFalse(mock_brightness.called)
