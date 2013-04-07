var urls = [
	'http://archive.org/movies/thumbnails.php?identifier=0924_Greatest_Name_in_Wine_The_11_00_13_15'
, 'http://archive.org/movies/thumbnails.php?identifier=Tuna_Seining_and_Porpoise_Safety_04_22_43_00'
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
			r['id'] = window.location.href.split('=')[1];
			r['thumbnails'] = thumbnail_links;
			return r;
	  }
	]
});
