import math
from builtins import range

from BaseFilter import BaseFilter
from BoundedValue import BoundedValue


class Pinch(BaseFilter):

    def apply(self, degree, *args, **kwargs):
        degree = BoundedValue(degree, 1, 32)
        degree = degree.value
        pinch_point = kwargs.get(
            'pinch_point', (self.width / 2, self.height / 2))
        self.convert("RGBA")
        canvas, canvas_pixels = self.get_canvas()

        for w in range(self.width):
            for h in range(self.height):
                # The offset of the current pixel
                offset_x, offset_y = w - pinch_point[0], h - pinch_point[1]

                # Angle which math.atan2 (y, x) is obtained
                radian = math.atan2(offset_y, offset_x)
                # Pixel distance from the current point of extrusion
                radius = math.sqrt(offset_x ** 2 + offset_y ** 2)

                act_radius = math.sqrt(radius) * degree
                # The actual pixels
                x = int(act_radius * math.cos(radian)) + pinch_point[0]
                y = int(act_radius * math.sin(radian)) + pinch_point[1]

                x = BoundedValue(x, 0, self.width - 1).value
                y = BoundedValue(y, 0, self.height - 1).value

                canvas_pixels[w, h] = self.pixels[x, y]

        return canvas
