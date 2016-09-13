from builtins import range

from BaseFilter import BaseFilter
from BoundedValue import BoundedValue
from PIL import Image


class OilPainting(BaseFilter):

    def apply(self, brush_size=4, roughness=30):
        bounded_brush_size = BoundedValue(brush_size, 1, 8)
        self.brush_size = bounded_brush_size.value
        bounded_roughness = BoundedValue(roughness, 1, 255)
        self.roughness = bounded_roughness.value
        gray_image = self.image.convert('L')

        def reset():
            for value in (count, A, R, G, B):
                for i in range(roughness):
                    value[i] = 0

        if self.image.mode != 'RGBA':
            self.image = self.image.convert('RGBA')
        background = Image.new('RGBA', (self.width, self.height))

        gray_pixels = gray_image.load()
        pixels = self.image.load()
        background_pixels = background.load()  # background to draw on

        roughness = self.roughness + 1
        count, A, R, G, B = [[0] * roughness for i in range(5)]

        for w in range(self.width):
            left = w - self.brush_size
            if left < 0:
                left = 0

            right = w + self.brush_size
            if right > self.width - 1:
                right = self.width - 1

            for h in range(self.height):
                top = h - self.brush_size
                if top < 0:
                    top = 0

                bottom = h + self.brush_size
                if bottom > self.height - 1:
                    bottom = self.height - 1

                reset()

                for i in range(left, right + 1):
                    for j in range(top, bottom + 1):
                        intensity = int(
                            gray_pixels[i, j] * self.roughness / 255)
                        count[intensity] += 1
                        pixel = pixels[i, j]
                        A[intensity] += pixel[3]
                        R[intensity] += pixel[0]
                        G[intensity] += pixel[1]
                        B[intensity] += pixel[2]

                max_ins_count = max(count)
                max_idx = count.index(max_ins_count)

                background_pixels[w, h] = (int(R[max_idx] / max_ins_count),
                                           int(G[max_idx] / max_ins_count),
                                           int(B[max_idx] / max_ins_count),
                                           int(A[max_idx] / max_ins_count))

        return background
