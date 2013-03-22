var system = require('system'),
    page = require('webpage').create();

page.open(system.args[1], function () {
    var th = page.evaluate(function () {
        return document.getElementById('thumbnail').src;
    });
    console.log(th);
    //console.log(JSON.stringify({ thumbnail : th }));
    phantom.exit();
});
