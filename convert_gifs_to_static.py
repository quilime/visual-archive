# import json
# import os
# from pprint import pprint
# json_data = open('prelinger.json')

# data = json.load(json_data)
# #pprint(data)

# for clip in data['clips']:
#     thumb = clip['thumbnail'].rpartition('?')[0]
#     print thumb
#     os.system('cd gifs/prelinger/; curl -O ' + thumb)

# json_data.close()

# convert gifs/prelinger/0540_1935_Pontiac_Advertising_R2_13_38_44_00_3mb.gif[3] -coalesce out.gif
# convert gifs/prelinger/0540_Spain_in_Revolt_R3_13_00_52_20_3mb.gif -format "%[scenes]" info: | tail -n 1

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
        # try:
        #     with open(dest_path + gif) :
        #         os.system('convert ' + src_path + gif + '[' + str(staticFrame) + '] -coalesce ' + dest_path + gif)
        #         pass
        # except IOError:
        #     print 'Oh dear.'



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
