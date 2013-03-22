var system = require('system');
var page = require('webpage').create();

var prelinger_ids = require('./prelinger_identifiers.json');
var ids = prelinger_ids.identifiers;
var url_details = "http://archive.org/details/";

if (system.args.length === 1) {
    console.log('Identifier Required');
} else {
    var id = system.args[1];



    page.open(url_details + id, function () {
        var th = page.evaluate(function () {
            return document.getElementById('thumbnail').src;
        });
        console.log(th);
        phantom.exit();
    });
}
