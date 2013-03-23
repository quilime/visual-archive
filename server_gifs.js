var express = require("express"),
    request = require('request'),
    jsdom   = require("jsdom"),
    app     = express(),
    fs      = require("fs"),
    port    = 3000;

var jquery = fs.readFileSync("./public/jquery-1.9.1.min.js").toString();

var prelinger = require('./prelinger.json');


app.get("/", function(req, res) {
  var out = [];
  out.push('<ul class="thumbs">');
  // prelinger.clips.length
  var count = 10;
  for( var i = 0; i < prelinger.clips.length; i++) {

    count--;
    if (count == 0)
      break;

    var clip = prelinger.clips[i];
    var t = clip.thumbnail_filename;
    var turl = clip.thumbnails_url;
    var url = clip.url;

    var ext = t.split('.')[1];


    if (ext == 'gif') {
      out.push([
        '<li id="'+ clip.id +'" data-thumbs-url="' + turl + '">',
        '<a href="#">',
        '<img src="prelinger_static/' + t + '">',
        '</a>',
        '</li>'].join("")
        );
    }

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



// url proxy
app.get("/thumbs/", function(req, res) {
  jsdom.env({
    html : req.query["url"],
    src : [jquery],
    done: function (errors, window) {
      var $ = window.$;
      var thumbs = [];
      var as =$("div.box div a");
      for (var i = 0; i < as.length; i++) {
        thumbs.push({
          "url" : "http://archive.org" + $(as[i]).attr('href'),
          "img" : $(as[i]).find('img').attr('src')
        });
      }
      res.end(JSON.stringify({
        "url" : req.query["url"],
        "links" : thumbs
      }));
    }
  });
})






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
