from PIL import Image


class ManipulateImage():

    def __init__(self, image):
        self.image = image

    def manipulate(self, data):
        crop_param = data.get("crop")
        resize_param = data.get("resize")
        flip_param = data.get("flip")
        rotate_degree = data.get("rotate")
        if crop_param:
            return self.crop_image(crop_param)
        if resize_param:
            return self.resize_image(resize_param)
        if flip_param:
            return self.flip(flip_param)
        if rotate_degree is not None:
            return self.rotate(rotate_degree)
        return self.image

    def crop_image(self, param):
        left = param.get('left')
        upper = param.get('upper')
        right = param.get('right')
        lower = param.get('lower')
        box = (left, upper, right, lower)
        if all(i is not None for i in box):
            return self.image.crop(box)

    def resize_image(self, param):
        percentage = param.get('percentage')
        if percentage is not None:
            width, height = self.image.size
            width = int(width*(percentage/100.0))
            height = int(height*(percentage/100.0))
        else:
            width = param.get('width')
            height = param.get('height')
        size = (width, height)
        if all(i is not None for i in size):
            return self.image.resize(size)

    def flip(self, param):
        if param.get("mirror"):
            self.image = self.image.transpose(Image.FLIP_LEFT_RIGHT)
        if param.get("top_bottom"):
            self.image = self.image.transpose(Image.FLIP_TOP_BOTTOM)
        return self.image

    def rotate(self, degree):
        # degree = min(degree, 360)
        return self.image.rotate(degree)
