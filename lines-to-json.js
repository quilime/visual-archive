var exec = require('child_process').exec;
var fs  = require("fs");

console.log('{ identifiers : [');
fs.readFileSync('./prelinger_identifiers.txt').toString().split('\n').forEach(
function (line) {
  console.log('"'+line + '",');
  }
);
console.log(']}');
