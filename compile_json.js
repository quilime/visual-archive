var ids = require('./prelinger_identifiers.json'); ids = ids.identifiers;
var thumbs = require('./prelinger_thumbs.json');

var output = { "clips" : [] };

for (var i = 0; i < ids.length; i++) {
  var id = ids[i];
  for (var j = 0; j < thumbs.length; j++) {
    var n = thumbs[j].match("/" + id + "/");
    if (n && n.length > 0) {
      var thumbnail = thumbs[j].split('?')[0];
      var thumbnail_filename = thumbnail.split('/');
      thumbnail_filename = thumbnail_filename[thumbnail_filename.length-1];
      output.clips.push({
        "id" : id,
        "url" : "http://archive.org/details/" + id,
        "thumbnails_url" : "http://archive.org/movies/thumbnails.php?identifier=" + id,
        "thumbnail" : thumbnail,
        "thumbnail_filename" : thumbnail_filename
        }
      );
    }
  }
}

console.log(JSON.stringify(output));
