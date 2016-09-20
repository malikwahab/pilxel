from builtins import range

from BaseFilter import BaseFilter


class Aqua(BaseFilter):

    def apply(self):
        self.convert("RGB")

        for w in range(self.width):
            for h in range(self.height):
                r, g, b = self.pixels[w, h]

                self.pixels[w, h] = (min(255, int((g - b) ** 2 / 128)),
                                     min(255, int((r - b) ** 2 / 128)),
                                     min(255, int((r - g) ** 2 / 128)))
        return self.image
