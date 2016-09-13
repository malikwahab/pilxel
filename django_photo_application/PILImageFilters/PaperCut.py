import math
from builtins import range

from BaseFilter import BaseFilter


class PaperCut(BaseFilter):

    def apply(self, **kwargs):
        bg_color = kwargs.get('bg_color', (255, 255, 255, 0))
        fg_color = kwargs.get('fg_color', (86, 93, 88, 1))
        self.threshold = kwargs.get('threshold', 100)
        self.bg_color = self.convert_color_to_rgba(bg_color)
        self.fg_color = self.convert_color_to_rgba(fg_color)
        matrix = self.to_binary_array()
        return self.get_image_from_binary(matrix)

    def to_binary_array(self):
        self.convert('L')
        get_val = lambda p: 255 if p >= self.threshold else 0
        return ([[get_val(self.pixels[w, h])
                 for w in range(self.width)] for h in range(self.height)])

    @staticmethod
    def convert_color_to_rgba(color):
        if len(color) == 1:
            return (color, color, color, 255)
        elif len(color) == 3:
            color = list(color)
            color.append(255)
            return tuple(color)
        elif len(color) == 4:
            return color
        else:
            raise ValueError('len(color) cannot be %d' % len(color))

    def get_image_from_binary(self, matrix):
        height, width = len(matrix), len(matrix[0])
        canvas, canvas_pixels = self.get_canvas()
        for w in range(width):
            for h in range(height):
                if matrix[h][w] < 128:
                    canvas_pixels[w, h] = self.fg_color
                else:
                    canvas_pixels[w, h] = self.bg_color
        return canvas
