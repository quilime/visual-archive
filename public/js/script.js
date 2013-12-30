var extended_json = {};
var numItems = 0;

var revealThumbs = function() {

    var thumbMargin = 5;
    var thumbsW = $('#thumbs').width();
    var thumbW  = 160 + thumbMargin * 2;
    var thumbH  = 110 + thumbMargin * 2;
    var winInnerW = $(window).innerWidth();
    var winInnerH = $(window).innerHeight();
    var numCols = Math.floor(thumbsW / thumbW);
    var numRows = Math.floor(winInnerH / thumbH)
    var offset  = Math.max(Math.floor($(window).scrollTop() / thumbH) * numCols, 0);
/*
    console.log( 
	numCols,
	numRows,
	numCols * numRows,
	offset	
    );
*/
    var c = 0;
    $.each( $('.thumbs li'), function( key, elem ) {
	if (key >= offset && key < offset + numCols * numRows) {
	    if ($(elem).find('img').length === 0) {

		var img = $('<img/>');
		img.attr('src', $(elem).attr('data-thumb-src'));
		img.hide();
		setTimeout(function() { img.fadeIn(); }, 50 * c);

		var a = $('<a>');
		a.attr('href', $(elem).attr('data-thumbs-url'));
		a.attr('target', '_blank');
		a.append(img);

		var th_nm = $(elem).attr('data-thumb-src').split("/");
		th_nm = th_nm[th_nm.length-1];

		a.hover(function() {
		    img.attr('src', 'gifs/prelinger_anim/' + th_nm);
		});
		a.mouseout(function() {
		    img.attr('src', 'gifs/prelinger_static/' + th_nm);
		});


		$(elem).append(a);

		c++;
	    }
	}
    });
}


$(document).ready(function() {

  revealThumbs();
  window.onscroll = debounce(function (e) {
      revealThumbs();
  }, 250, false);

  $('#facets a').each(function(key, elem) {
    $(elem).click(function() {
      $('#filter').val($(elem).text());
      on_filter_change();
    });
  })

  $('#clear_filter').click(function(){
    $('#filter').val("");
    on_filter_change();
  });
  $('#filter').keyup(on_filter_change);

  $.getJSON('./data/prelinger_extended-search.json', function(data) {
    extended_json = data;
    $('#loader').hide();
  });

  numItems = $('.thumbs li').length;
    
});


var on_filter_change = function() {
  var query = $('#filter').val().toLowerCase();
  var d = jQuery.grep(extended_json.clips, function(clip, i) {
    if (clip.id.toLowerCase().indexOf(query) >= 0 ||
       (clip.description && clip.description.toLowerCase().indexOf(query) >= 0))
      return true;
    if (clip.subject)
      for (var j = 0; j < clip.subject.length; j++)
        if (clip.subject[j].toLowerCase().indexOf(query) >= 0)
          return true;
    return false;
  });

  $('.thumbs li').hide();

  for (var i = 0; i < d.length; i++) {
    $('.thumbs li#' + d[i].id).show();
  }

};




var debounce = function (func, threshold, execAsap) {
 
    var timeout;
 
    return function debounced () {
        var obj = this, args = arguments;
        function delayed () {
            if (!execAsap)
                func.apply(obj, args);
            timeout = null; 
        };
 
        if (timeout)
            clearTimeout(timeout);
        else if (execAsap)
            func.apply(obj, args);
 
        timeout = setTimeout(delayed, threshold || 100); 
    };
 
}

