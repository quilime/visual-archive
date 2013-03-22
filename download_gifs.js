var exec = require('child_process').exec;
var clips = require('./prelinger.json'); clips = clips.clips;

// var count = 0;

// var dl_thumb = function (t)  {
//     console.log("downloading", t);
//     exec('cd gifs/prelinger; curl -O ' + t);
//     count++;
// }


setInterval(function(){
    console.log('hit');
}, 2000);


// for (var i = 0; i < 1; i++) {
//     var t = clips[i]['thumbnail'].split("?")[0];
//     dl_thumb(t);
// }

