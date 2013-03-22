var express = require("express"),
    app     = express(),
    port    = 3000;

var prelinger = require('./prelinger.json');

app.get("/", function(req, res) {

  var out = [];

  out.push('<ul class="thumbs">');
  // prelinger.clips.length
  var count = 50;
  for( var i = 0; i < prelinger.clips.length; i++) {

    // count--;
    // if (count == 0)
    //   break;

    var clip = prelinger.clips[i];
    var t = clip.thumbnail_filename;
    var ts = clip.thumbnails_url;
    var url = clip.url;
    out.push([
      '<li id="'+ clip.id +'">',
      '<a href="' + ts + '">',
      '<img src="prelinger_static/' + t + '">',
      '</a>',
      '</li>'].join("")
      );
  }
  out.push('</ul>');
  out.push('<link rel="stylesheet" type="text/css" href="style.css">');
  out.push('<script src="jquery-1.9.1.min.js"></script>');
  out.push('<script src="script.js"></script>');
  var body = out.join("");

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);

});



app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/gifs'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});
app.listen(port);
console.log('Listening on port ' + port);



/*var express = require('express');
var app = express();

app.use(express.static(__dirname + '/css'));

//app.use("/css", express.static(__dirname + '/css'));

var prelinger = require('./prelinger.json');

app.get('/gifs', function(req, res){

  var out = [];
  out.push('<ul>');
  // prelinger.clips.length
  for( var i = 0; i < 2; i++) {
    var c = prelinger.clips[i];
    //out.push('<li><img src="' + c.thumbnail + '" /></li>');
    var t = c.thumbnail.split('/');
    t = t[t.length-1].split('?')[0];
    out.push('<li>' + t + '</li>');
  }
  out.push('</ul>');
  var body = out.join("");

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.listen(3000);
console.log('Listening on port 3000');

*/
