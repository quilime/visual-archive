var fs  = require("fs");
var collection = require('../data/prelinger.json');

var urls = new Array();
for(var i = 0; i < collection.clips.length; i++ ){
	urls[i] = 'http://archive.org/details/' + collection.clips[i].id;
}

pjs.config({
	timeoutInterval: 5000,
	timeoutLimit: 10000,
	format: 'json',
	writer: 'file',
	outFile: 'animgif_scrap_' + Date() + '.json',
	pageSettings : { loadImages : false }
});

pjs.addSuite({
	url: urls,
	scrapers: [
		function() {
			return $('#thumbnail').attr('src');
		}
	]
});
