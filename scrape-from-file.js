var exec = require('child_process').exec;
var fs  = require("fs");

fs.readFileSync('./prelinger_identifiers copy.txt').toString().split('\n').forEach(
function (line) {
    var scrapeID = exec('phantomjs phantom-scrape-thumbnail.js http://archive.org/details/' + line,
      function (error, stdout, stderr) {
        console.log(stdout, stderr);
        fs.open("./output.txt", 'a', 0666, function(err, fd) {
          fs.writeSync(fd, stdout.toString() + "\n", null, undefined, function(err, written) {
          })
        });
      }
    );
  }
);
