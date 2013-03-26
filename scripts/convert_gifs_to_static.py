import os
src_path="gifs/prelinger_anim/"
dest_path="gifs/prelinger_static/"
dirList=os.listdir(src_path)

def main():
    # count = 0;
    for f in dirList:
        # if (count > 10) :
        #     exit()
        # count += 1
        if (f == '.DS_Store'):
            continue

        gif = f

        print gif
        numFrames = get_gif_num_frames(src_path + gif);
        if (numFrames > 0):
            if (numFrames > 2):
                staticFrame = numFrames / 2;
            else:
                staticFrame = 0;

        os.system('convert ' + src_path + gif + '[' + str(staticFrame) + '] -coalesce ' + dest_path + gif)


class GIFError(Exception): pass
def get_gif_num_frames(filename):
    frames = 0
    with open(filename, 'rb') as f:
        if f.read(6) not in ('GIF87a', 'GIF89a'):
            return -1
            #raise GIFError(filename + ' not a valid GIF file')
        f.seek(4, 1)
        def skip_color_table(flags):
            if flags & 0x80: f.seek(3 << ((flags & 7) + 1), 1)
        flags = ord(f.read(1))
        f.seek(2, 1)
        skip_color_table(flags)
        while True:
            block = f.read(1)
            if block == ';': break
            if block == '!': f.seek(1, 1)
            elif block == ',':
                frames += 1
                f.seek(8, 1)
                skip_color_table(ord(f.read(1)))
                f.seek(1, 1)
            else: raise GIFError('unknown block type')
            while True:
                l = ord(f.read(1))
                if not l: break
                f.seek(l, 1)
    return frames


if __name__ == "__main__":
    main()
