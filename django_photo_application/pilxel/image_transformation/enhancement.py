from PIL import Image, ImageEnhance


class Enhancement():

    def __init__(self, image):
        self.image = image

    def enhance(self, data):
        brightness = data.get('brightness')
        contrast = data.get('contrast')
        sharpness = data.get('sharpness')
        color = data.get('color')
        if brightness is not None:
            return self.image_brightness(brightness)
        if contrast is not None:
            return self.image_contrast(contrast)
        if sharpness is not None:
            return self.image_sharpness(sharpness)
        if color is not None:
            return self.image_color(color)

    def image_brightness(self, degree):
        output = ImageEnhance.Brightness(self.image)
        return output.enhance(degree)

    def image_contrast(self, degree):
        output = ImageEnhance.Contrast(self.image)
        return output.enhance(degree)

    def image_sharpness(self, degree):
        output = ImageEnhance.Sharpness(self.image)
        return output.enhance(degree)

    def image_color(self, degree):
        output = ImageEnhance.Color(self.image)
        return output.enhance(degree)
