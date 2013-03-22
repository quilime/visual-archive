import xml.etree.ElementTree as ET
tree = ET.parse('search-lg.xml')
root = tree.getroot()

out = ""

for e in root.iter('str'):
    if (e.get('name') == "identifier"):
        out += ",\""  + e.text + "\""

print out
