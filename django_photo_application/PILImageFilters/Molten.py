from builtins import range

from BaseFilter import BaseFilter
from BoundedValue import BoundedValue


class Molten(BaseFilter):

    def apply(self):
        self.convert("RGB")

        for w in range(self.width):
            for h in range(self.height):
                r, g, b = self.pixels[w, h]

                self.pixels[w, h] = (min(255, int(abs(r * 128 / (g + b + 1)))),
                                     min(255, int(abs(g * 128 / (b + r + 1)))),
                                     min(255, int(abs(b * 128 / (r + g + 1)))))
        return self.image
