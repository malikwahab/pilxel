from builtins import range

from BaseFilter import BaseFilter
from BoundedValue import BoundedValue
from PIL import Image


class Mosaic(BaseFilter):

    def apply(self, block_size=10):
        block_size = BoundedValue(block_size, 1, 32).value

        if self.image.mode != "RGBA":
            self.image = self.image.convert("RGBA")
        pixels = self.image.load()

        background = Image.new("RGBA", (self.width, self.height))
        background_pixels = background.load()

        for w in range(0, self.width, block_size):
            for h in range(0, self.height, block_size):
                r_sum, g_sum, b_sum = 0, 0, 0
                size = block_size ** 2

                for i in range(w, min(w + block_size, self.width)):
                    for j in range(h, min(h + block_size, self.height)):
                        r_sum += pixels[i, j][0]
                        g_sum += pixels[i, j][1]
                        b_sum += pixels[i, j][2]

                r_ave = int(r_sum / size)
                g_ave = int(g_sum / size)
                b_ave = int(b_sum / size)

                for i in range(w, min(w + block_size, self.width)):
                    for j in range(h, min(h + block_size, self.height)):
                        background_pixels[
                            i, j] = r_ave, g_ave, b_ave, pixels[w, h][3]
        return background
