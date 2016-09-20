from builtins import range

from BaseFilter import BaseFilter


class Comic(BaseFilter):

    def apply(self):

        if self.image.mode != 'RGB':
            self.image = self.image.convert('RGB')

        pixels = self.image.load()

        for w in range(self.width):
            for h in range(self.height):
                r, g, b = pixels[w, h]
                pixels[w, h] = tuple(map(lambda i: min(255, i),
                                         [abs(g - b + g + r) * r / 256,
                                          abs(b - g + b + r) * r / 256,
                                          abs(b - g + b + r) * r / 256]))
        return self.image.convert('L')
