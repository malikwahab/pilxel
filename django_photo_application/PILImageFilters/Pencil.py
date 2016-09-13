from builtins import range
from BaseFilter import BaseFilter
from BoundedValue import BoundedValue


class Pencil(BaseFilter):

    def apply(self, threshold=30):
        threshold = BoundedValue(threshold, 0, 100).value
        canvas, canvas_pixels = self.get_canvas()

        self.convert("RGBA")

        for w in range(self.width):
            for h in range(self.height):
                if w == 0 or w == self.width - 1 \
                   or h == 0 or h == self.height - 1:
                    continue

                # A total of nine pixels around containing the current pixels
                pixels_around = [self.pixels[i, j][:3] for j in range(h-1, h+2) for i in range(w-1, w+2)]
                # Pixels around excluding the current pixel
                exclude_current_pixels = tuple(pixels_around[:4] + pixels_around[5:])
                RGB = map(lambda l: int(sum(l) / len(l)), zip(*exclude_current_pixels))

                current_pixel = self.pixels[i, j]

                current_draw = all([abs(current_pixel[i] - RGB[i]) >= threshold for i in range(3)])

                if current_draw:
                    canvas_pixels[w, h] = 0, 0, 0, current_pixel[3]
                else:
                    canvas_pixels[w, h] = 255, 255, 255, current_pixel[3]

        return canvas
