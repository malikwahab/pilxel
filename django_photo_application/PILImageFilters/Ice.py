from builtins import range

from BaseFilter import BaseFilter


class Ice(BaseFilter):

    def apply(self):
        self.convert("RGB")

        for w in range(self.width):
            for h in range(self.height):
                r, g, b = self.pixels[w, h]

                self.pixels[w, h] = (min(255, int(abs(r - g - b) * 3 / 2)),
                                     min(255, int(abs(g - b - r) * 3 / 2)),
                                     min(255, int(abs(b - r - g) * 3 / 2)))
        return self.image
