var fs  = require("fs");
var collection = require('../data/prelinger.json');

var urls = new Array();
for(var i = 0; i < collection.clips.length; i++ ){
	urls[i] = 'http://archive.org/movies/thumbnails.php?identifier=' + collection.clips[i].id;
}

pjs.config({
	timeoutInterval: 5000,
	timeoutLimit: 10000,
	format: 'json',
	writer: 'file',
	outFile: 'thumb_scrape_' + Date() + '.json',
	pageSettings : { loadImages : false }
});

pjs.addSuite({
	url: urls,
	scrapers: [
	  function() {
			var r = {};
			var thumbnail_links = $('.box div a').map(function() {
	        return {
						img: $('img', this).attr('src'),
						link: $(this).attr('href')
	        }
	        }).toArray();
			r['id'] = window.location.href.split('=')[1];
			r['thumbnails'] = thumbnail_links;
			return r;
		}
	]
});
