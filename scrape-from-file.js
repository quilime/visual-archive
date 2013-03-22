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


// var output = { "clips" : [] };
// for (var i = 0; i < prelinger.identifiers.length; i++) {
//     var id = prelinger.identifiers[i];
// /*
// fs.appendFile('message.txt', 'data to append', function (err) {
// });
// */
// }




// fs.open("./output.txt", 'w', 0666, function(err, fd) {
//   fs.writeSync(fd, JSON.stringify(output) + "\n", null, undefined, function(err, written) {
//   })
// });

// "http://archive.org/details/" +

// var id = '0924_Greatest_Name_in_Wine_The_11_00_13_15';
// cmd = spawn('phantomjs' ['phantom-scrape-id.js']);





// var id = '0924_Greatest_Name_in_Wine_The_11_00_13_15';
// var scrapeID = exec('phantomjs phantom-scrape-thumbnail.js http://archive.org/details/' + id,
//     function (error, stdout, stderr) {
//         console.log(stdout, stderr);
//     }
// );
