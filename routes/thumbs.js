var jsdom   = require("jsdom")
,   fs      = require("fs")
,   jquery  = fs.readFileSync("./public/js/jquery-1.9.1.min.js").toString();

exports.list = function(req, res) {

  jsdom.env(
      req.query["url"],
      [ "http://code.jquery.com/jquery.js" ],
      function (errors, window) {
	  var $ = window.$ || null;
	  if (!$) {
              res.send(JSON.stringify({}));
	  }
	  var thumbs = [];
	  var as = $("div.box div a");
	  for (var i = 0; i < as.length; i++) {
              thumbs.push({
		  "url" : "http://archive.org" + $(as[i]).attr('href'),
		  "img" : $(as[i]).find('img').attr('src')
              });
	  }
	  res.send(JSON.stringify({
              "url" : req.query["url"],
              "links" : thumbs
	  }));
      }
  );

};
