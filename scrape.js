
var identifier = "animals_in_the_service_of_man_2";
var url_details = "http://archive.org/details/";

var page = require('webpage').create();
page.open(url_details + identifier, function () {
    // page.render('page.png');

    var ua = page.evaluate(function () {
        return document.getElementById('thumbnail').src;
    });

    console.log(ua);
    phantom.exit();
});
