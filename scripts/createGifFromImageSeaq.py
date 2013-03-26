__author__ = 'Robert'
from images2gif import writeGif
from PIL import Image
import os

file_names = sorted(
    (fn for fn in os.listdir('.') if fn.endswith('.png'))
    )
#['animation_a.png', 'animation_b.png', ...] "

images = [Image.open(fn) for fn in file_names]

size = (150,150)
for im in images:
    im.thumbnail(size, Image.ANTIALIAS)

print writeGif.__doc__
# writeGif(filename, images, duration=0.1, loops=0, dither=1)
#    Write an animated gif from the specified images.
#    images should be a list of numpy arrays of PIL images.
#    ...
#    ...

filename = "my_gif.GIF"
writeGif(filename, images, duration=0.2)
#54 frames written
#
#Process finished with exit code 0
