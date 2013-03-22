// output to sqlite

var thumbs = require('./prelinger_thumbs.json');

console.log(thumbs[0]);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('prelinger.db');
db.serialize(function() {

  db.run("CREATE TABLE lorem (info TEXT)");

  /*
CREATE TABLE IF NOT EXISTS entries(
id INTEGER PRIMARY KEY AUTOINCREMENT,
added DEFAULT CURRENT_TIMESTAMP,
link TEXT,
title TEXT,
desc TEXT,
url TEXT,
mimetype TEXT)
  */

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();
