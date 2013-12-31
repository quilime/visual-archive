var extended_json = {};
var currentItems = [];

var revealThumbs = function() {

    var thumbMargin = 5;
    var thumbsW = $('#thumbs').width();
    var thumbW  = 160 + thumbMargin * 2;
    var thumbH  = 110 + thumbMargin * 2;
    var winInnerW = $(window).innerWidth();
    var winInnerH = $(window).innerHeight();
    var numCols = Math.floor(thumbsW / thumbW);
    var numRows = Math.ceil(winInnerH / thumbH) * 2;
    var offset  = Math.max((Math.floor(($(window).scrollTop() - $('ul.thumbs').position().top) / thumbH) * numCols), 0);
/*
    console.log( 
	numCols,
	numRows,
	numCols * numRows,
	offset	
    );
*/
    var c = 0;
    $.each( currentItems, function( key, elem ) {
	if (key >= offset && key < offset + numCols * numRows) {
	    loadThumb(elem, 10 * c++);
	}
    });
}

var loadThumb = function(elem, fadeOffset) {

    if ($(elem).find('img').length > 0) {
	return;
    }
    
    var img = $('<img/>');
    img.attr('src', $(elem).attr('data-thumb-src'));
    img.hide();
    img.load(function() {
	setTimeout(function() { img.fadeIn(150); }, fadeOffset);
    });
    
    var a = $(elem).find('a');
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
}


$(document).ready(function() {

    $('#facets').dropit();

    window.onscroll = debounce(function (e) {
	revealThumbs();
    }, 250, false);

    $('#facets a').click(function(e){ e.preventDefault(); });
    $('#facets ul a').each(function(key, elem) {
	$(elem).click(function(e) {
	    e.preventDefault();
	    $('#filter').val($(elem).text());
	    on_filter_change();
	});
    });

    $('#filter')[0].onkeyup = debounce(function(e) {
	on_filter_change();
    }, 250, false);
    $('#nav h1 a').click(function(e){
	e.preventDefault();
	$('#filter').val("");
	on_filter_change();	
    });
	

    $.getJSON('./data/prelinger_extended-search.json', function(data) {
	extended_json = data;
	currentItems = $('.thumbs li');
	revealThumbs();
    });

});


var on_filter_change = function() {
    $(document).scrollTop(0);
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


    currentItems = [];
    for (var i = 0; i < d.length; i++) {
	var elem = $('.thumbs li#' + d[i].id)[0];
	$('.thumbs li#' + d[i].id).show();
	currentItems.push($('.thumbs li#' + d[i].id)[0]);
    }
    revealThumbs(); 

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

