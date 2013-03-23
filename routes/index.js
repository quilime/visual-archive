var fs        = require("fs")
,   prelinger = require('../prelinger_extended-search.json');

var LIMIT = false;

exports.index = function(req, res) {
  var count = 10;
  var clips = [];
  for( var i = 0; i < prelinger.clips.length; i++) {
    if (LIMIT) { count--; if (count == 0) { break; } }
    var clip = prelinger.clips[i];
    var ext = clip.thumbnail_filename.split('.')[1];
    if (ext == 'gif') {
      clips.push(clip);
    }
  }
  res.render('index', { title: 'Archive.org/Prelinger Explorer', clips : clips });
};
