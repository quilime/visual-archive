import json
import os
from pprint import pprint
json_data = open('prelinger.json')

data = json.load(json_data)

for clip in data['clips']:
    thumb = clip['thumbnail'].rpartition('?')[0]
    print thumb
    os.system('cd gifs/prelinger/; curl -O ' + thumb)

json_data.close()
