var exec = require('child_process').exec;
var fs  = require("fs");

// fs.readFileSync('./input.txt').toString().split('\n').forEach(function (line) {
//     console.log(line);
//     fs.appendFileSync("./output.txt", line.toString() + "\n";
// });

var prelinger = require('./prelinger_identifiers.json');

var output = { "clips" : [] };
for (var i = 0; i < prelinger.identifiers.length; i++) {
    var id = prelinger.identifiers[i];
    output.clips[i] = { "id" : id };
}

fs.open("./output.txt", 'w', 0666, function(err, fd) {
  fs.writeSync(fd, JSON.stringify(output) + "\n", null, undefined, function(err, written) {
  })
});

// "http://archive.org/details/" +

// var id = '0924_Greatest_Name_in_Wine_The_11_00_13_15';
// cmd = spawn('phantomjs' ['phantom-scrape-id.js']);



