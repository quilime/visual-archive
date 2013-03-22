import xml.etree.ElementTree as ET
tree = ET.parse('search-lg.xml')
root = tree.getroot()

for e in root.iter('str'):
    if (e.get('name') == "identifier"):
        print e.text
