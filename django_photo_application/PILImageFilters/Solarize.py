from builtins import range

from BaseFilter import BaseFilter
from BoundedValue import BoundedValue


class Solarize(BaseFilter):

    def apply(self):
        self.convert("RGB")
        return self.image.point(lambda i: i ^ 0xFF if i < 128 else i)
