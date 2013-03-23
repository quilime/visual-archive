import xml.etree.ElementTree as ET
import json
tree = ET.parse('search-lg.xml')
root = tree.getroot()

data = { "clips" : [] }

for result in root.iter('doc'):

    c = {}

    for e in result.iter('str'):
        if (e.get('name') == "identifier"):
            c["id"] = e.text
        if (e.get('name') == "description"):
            c["description"] = e.text
        if (e.get('name') == "title"):
            c["title"] = e.text

    for e in result.iter('date'):
        if (e.get('name') == "publicdate"):
            c["date"] = e.text

    for e in result.iter('date'):
        if (e.get('name') == "publicdate"):
            c["date"] = e.text

    for e in result.iter('arr'):
        if (e.get('name') == "subject"):
            c["subject"] = []
            for s in e.iter('str'):
                c["subject"].append(s.text)

    data['clips'].append(c)

print json.dumps(data)
