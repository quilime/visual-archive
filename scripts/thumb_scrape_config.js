var urls = [
	'http://archive.org/movies/thumbnails.php?identifier=0924_Greatest_Name_in_Wine_The_11_00_13_15'
];

pjs.config({
  timeoutInterval: 5000,
  timeoutLimit: 10000,
  format: 'json',
  writer: 'file',
  outFile: 'scrape_output.json',
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
		r['url'] = window.location.href;
		r['thumbnails'] = thumbnail_links;
		return r;
  }
]
});
