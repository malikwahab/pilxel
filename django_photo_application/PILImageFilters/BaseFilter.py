from PIL import Image


class BaseFilter(object):

    def __init__(self, image):
        self.image = image.copy()
        self.pixels = self.image.load()
        self.width, self.height = self.image.size

    def apply(self):
        return self.image

    def get_canvas(self):
        canvas = Image.new("RGBA", (self.width, self.height))
        canvas_pixels = canvas.load()
        return canvas, canvas_pixels

    def convert(self, mode):
        if self.image.mode != mode:
            self.image = self.image.convert(mode)
        self.pixels = self.image.load()
        return self
