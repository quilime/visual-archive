var fs        = require("fs")
,   prelinger = require('../data/prelinger_extended-search.json');

var LIMIT = false;
var count = 50;

exports.index = function(req, res) {
  var clips = [];
  for( var i = 0; i < prelinger.clips.length; i++) {
    if (LIMIT) { count--; if (count == 0) { break; } }
    var clip = prelinger.clips[i];
    var ext = clip.thumbnail_filename.split('.')[1];
    clip.thumb_imgsrc = 'gifs/prelinger_static/' + clip.thumbnail_filename;
//gifs/prelinger_static/<%= clips[i].thumbnail_filename %>
    if (ext == 'gif') {
      clips.push(clip);
    }
  }
  res.render('index', { title: 'Visual Archive', clips : clips });
};
