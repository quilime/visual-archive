var ids = require('../data/prelinger_identifiers.json'); ids = ids.identifiers;
var extended = require('../data/prelinger_extended.json'); extended_clips = extended.clips;
var anim_thumbs = require('../data/prelinger_animgifs.json');
var static_thumbs = require('../data/prelinger_static_thumbs.json');

var output = { "clips" : [] };
for( var i = 0; i < ids.length; i++) {
  var id = ids[i];

  // process animated gifs
  var n = anim_thumbs[i].match("/" + id + "/");
  var anim_thumb;
  if ( n && n.length > 0) {
    anim_thumb = anim_thumbs[i].split('?')[0];
  }

  // process static thumbs
  var static_thumb = [];
  if (static_thumbs[i]) {
    static_thumb = static_thumbs[i]['thumbnails'];
  }

  // create output
  output.clips.push({
    "id" : id,
    "date" : extended_clips[i].date,
    "description" : extended_clips[i].description,
    "subject" : extended_clips[i].subject,
    "title": extended_clips[i].title,
    "url" : "http://archive.org/details/" + id,
    "thumbnail_anim" : anim_thumb,
    "thumbnails_url" : "http://archive.org/movies/thumbnails.php?identifier=" + id,
    "thumbnails" : static_thumb
  });
}

console.log(JSON.stringify(output));
