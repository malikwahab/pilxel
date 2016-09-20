from builtins import range
import math

from BaseFilter import BaseFilter


class GlowingEdge(BaseFilter):

    def apply(self):
        self.convert("RGBA")

        for w in range(self.width-1):
            for h in range(self.height-1):
                bottom = self.pixels[w, h+1]
                right = self.pixels[w+1, h]
                current = self.pixels[w, h]
                pixel = [int(math.sqrt((item[0] - item[1]) ** 2 + (item[0] - item[2]) ** 2) * 2)
                         for item in zip(current, bottom, right)[:3]]
                pixel.append(current[3])

                self.pixels[w, h] = tuple([min(max(0, i), 255) for i in pixel])
        return self.image
