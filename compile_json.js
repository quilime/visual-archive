var ids = require('./prelinger_identifiers.json'); ids = ids.identifiers;
var thumbs = require('./prelinger_thumbs.json');

var output = { "clips" : [] };

for (var i = 0; i < ids.length; i++) {
  var id = ids[i];
  for (var j = 0; j < thumbs.length; j++) {
    var n = thumbs[j].match("/" + id + "/");
    if (n && n.length > 0) {
      var thumbnail = thumbs[j].split('?')[0];
      output.clips.push({
        "id" : id,
        "url" : "http://archive.org/details/" + id,
        "thumbnail" : thumbnail,
        }
      );
    }
  }
}

console.log(JSON.stringify(output));
