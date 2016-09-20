from PIL import ImageFilter, Image
import mock
from io import BytesIO
from unittest import TestCase
from pilxel.image_transformation.filters import FilterImage
from django.core.files import File
from pilxel.image_transformation.filters import *


class TestFilterImageDefaultFilters(TestCase):

    def setUp(self):
        image_obj = Image.new("RGBA", size=(50, 50), color=(255, 0, 0, 1))
        self.mock_image_object = mock.create_autospec(image_obj)
        self.filter_image = FilterImage(self.mock_image_object)

    def test_apply_blur(self):
        self.filter_image.filter(filter_type="blur")
        self.mock_image_object.filter.assert_called_with(ImageFilter.BLUR)

    def test_apply_contour(self):
        self.filter_image.filter(filter_type="contour")
        self.mock_image_object.filter.assert_called_with(ImageFilter.CONTOUR)

    def test_apply_detail(self):
        self.filter_image.filter(filter_type="detail")
        self.mock_image_object.filter.assert_called_with(ImageFilter.DETAIL)

    def test_apply_edge_enhance(self):
        self.filter_image.filter(filter_type="edge_ehnance")
        self.mock_image_object.filter.assert_called_with(ImageFilter.EDGE_ENHANCE)

    def test_apply_edge_enhance_more(self):
        self.filter_image.filter(filter_type="edge_enhance_more")
        self.mock_image_object.filter.assert_called_with(ImageFilter.EDGE_ENHANCE_MORE)

    def test_apply_emboss(self):
        self.filter_image.filter(filter_type="emboss")
        self.mock_image_object.filter.assert_called_with(ImageFilter.EMBOSS)

    def test_apply_find_edges(self):
        self.filter_image.filter(filter_type="find_edges")
        self.mock_image_object.filter.assert_called_with(ImageFilter.FIND_EDGES)

    def test_apply_smooth(self):
        self.filter_image.filter(filter_type="smooth")
        self.mock_image_object.filter.assert_called_with(ImageFilter.SMOOTH)

    def test_apply_smooth_more(self):
        self.filter_image.filter(filter_type="smooth_more")
        self.mock_image_object.filter.assert_called_with(ImageFilter.SMOOTH_MORE)

    def test_apply_sharpen(self):
        self.filter_image.filter(filter_type="sharpen")
        self.mock_image_object.filter.assert_called_with(ImageFilter.SHARPEN)


class TestFilterImageCustomFilters(TestCase):

    def setUp(self):
        image_obj = Image.new("RGBA", size=(50, 50), color=(255, 0, 0, 1))
        self.filter_image = FilterImage(image_obj)

    @mock.patch.object(Aqua, "apply")
    def test_apply_aqua(self, mock_aqua_apply):
        self.filter_image.filter(filter_type="aqua")
        self.assertTrue(mock_aqua_apply.called)

    @mock.patch.object(Comic, "apply")
    def test_apply_comic(self, mock_comic_apply):
        self.filter_image.filter(filter_type="comic")
        self.assertTrue(mock_comic_apply.called)

    @mock.patch.object(GlowingEdge, "apply")
    def test_apply_glowingedge(self, mock_glowingedge_apply):
        self.filter_image.filter(filter_type="glowingedge")
        self.assertTrue(mock_glowingedge_apply.called)

    @mock.patch.object(Ice, "apply")
    def test_apply_Ice(self, mock_ice_apply):
        self.filter_image.filter(filter_type="ice")
        self.assertTrue(mock_ice_apply.called)

    @mock.patch.object(Molten, "apply")
    def test_apply_molten(self, mock_molten_apply):
        self.filter_image.filter(filter_type="molten")
        self.assertTrue(mock_molten_apply.called)

    @mock.patch.object(OilPainting, "apply")
    def test_apply_oilpainting(self, mock_oilpainting_apply):
        self.filter_image.filter(filter_type="oilpainting")
        self.assertTrue(mock_oilpainting_apply.called)

    @mock.patch.object(PaperCut, "apply")
    def test_apply_papercut(self, mock_papercut_apply):
        self.filter_image.filter(filter_type="papercut")
        self.assertTrue(mock_papercut_apply.called)

    @mock.patch.object(Pencil, "apply")
    def test_apply_pencil(self, mock_pencil_apply):
        self.filter_image.filter(filter_type="pencil")
        self.assertTrue(mock_pencil_apply.called)

    @mock.patch.object(Pinch, "apply")
    def test_apply_pinch(self, mock_pinch_apply):
        self.filter_image.filter(filter_type="pinch")
        self.assertTrue(mock_pinch_apply.called)

    @mock.patch.object(Sepia, "apply")
    def test_apply_sepia(self, mock_sepia_apply):
        self.filter_image.filter(filter_type="sepia")
        self.assertTrue(mock_sepia_apply.called)

    @mock.patch.object(Solarize, "apply")
    def test_apply_solarize(self, mock_solarize_apply):
        self.filter_image.filter(filter_type="solarize")
        self.assertTrue(mock_solarize_apply.called)
