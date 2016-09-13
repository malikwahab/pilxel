from PIL import ImageFilter
from PILImageFilters import *


class FilterImage():

    def __init__(self, image):
        self.image = image

    def filter(self, filter_type):
        filters = {
            "blur": ImageFilter.BLUR,
            "contour": ImageFilter.CONTOUR,
            "detail": ImageFilter.DETAIL,
            "edge_ehnance": ImageFilter.EDGE_ENHANCE,
            "edge_enhance_more": ImageFilter.EDGE_ENHANCE_MORE,
            "emboss": ImageFilter.EMBOSS,
            "find_edges": ImageFilter.FIND_EDGES,
            "smooth": ImageFilter.SMOOTH,
            "smooth_more": ImageFilter.SMOOTH_MORE,
            "sharpen": ImageFilter.SHARPEN
        }
        if filter_type in filters:
            return self.image.filter(filters[filter_type])
        if filter_type == "aqua":
            output = Aqua(self.image)
            return output.apply()
        if filter_type == "comic":
            output = Comic(self.image)
            return output.apply()
        if filter_type == "glowingedge":
            output = GlowingEdge(self.image)
            return output.apply()
        if filter_type == "ice":
            output = Ice(self.image)
            return output.apply()
        if filter_type == "molten":
            output = Molten(self.image)
            return output.apply()
        if filter_type == "oilpainting":
            output = OilPainting(self.image)
            return output.apply()
        if filter_type == "papercut":
            output = PaperCut(self.image)
            return output.apply()
        if filter_type == "pencil":
            output = Pencil(self.image)
            return output.apply()
        if filter_type == "pinch":
            output = Pinch(self.image)
            return output.apply(40)
        if filter_type == "sepia":
            output = Sepia(self.image)
            return output.apply()
        if filter_type == "solarize":
            output = Solarize(self.image)
            return output.apply()
