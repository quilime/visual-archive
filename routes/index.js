var fs        = require("fs")
,   prelinger = require('../prelinger_extended-search.json');

var LIMIT = true;
var count = 50;

exports.index = function(req, res) {
  var clips = [];
  for( var i = 0; i < prelinger.clips.length; i++) {
    if (LIMIT) { count--; if (count == 0) { break; } }
    var clip = prelinger.clips[i];
    var ext = clip.thumbnail_filename.split('.')[1];
    if (ext == 'gif') {
      clips.push(clip);
    }
  }
  res.render('index', { title: 'Visual Archive', clips : clips });
};
