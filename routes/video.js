var jsdom   = require("jsdom")
,   fs      = require("fs")
,   jquery  = fs.readFileSync("./public/js/jquery-1.9.1.min.js").toString();

exports.list = function(req, res) {
  jsdom.env({
    html : req.query["url"],
    src : [jquery],
    done: function (errors, window) {
      var $ = window.$;
      var thumbs = [];
      var playcontainer = $("#avplaycontainer");
      res.send(
        JSON.stringify(
        {
          "contents" :  playcontainer.contents()
        })
      );
      // res.send(JSON.stringify({
      //   "url" : req.query["url"],
      //   "links" : thumbs
      // }));
    }
  });
};
