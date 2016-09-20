from builtins import range

from BaseFilter import BaseFilter
from BoundedValue import HexBoundedValue


class Sepia(BaseFilter):

    def apply(self):

        # get the image pixel
        pixels = self.image.load()

        for w in range(self.width):
            for h in range(self.height):
                current_pixel = pixels[w, h]

                R = (25756 * current_pixel[0] + 50397 *
                     current_pixel[1] + 12386 * current_pixel[2]) >> 16
                G = (22872 * current_pixel[0] + 44958 *
                     current_pixel[1] + 11010 * current_pixel[2]) >> 16
                B = (17826 * current_pixel[0] + 34996 *
                     current_pixel[1] + 8585 * current_pixel[2]) >> 16

                # Set min of 0 and max of 255
                R = HexBoundedValue(R).value
                G = HexBoundedValue(G).value
                B = HexBoundedValue(B).value

                pixels[w, h] = R, G, B

        return self.image
