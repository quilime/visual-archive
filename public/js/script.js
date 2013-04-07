var extended_json = {};

$(document).ready(function() {

  $('#thumbs').hide();

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
    $('#thumbs').show();
  });

  $('#scrim').click(function() {
    $('#subcontent').fadeOut(100, function() {
      scrim(0);
      $('#subcontent .container').empty();
    });
  });

  $.each( $('.thumbs li'), function( key, elem ) {

    var id = $(elem).attr('id')
    var thumb_static = $(elem).find('img').attr('src');
    var thumb_name = thumb_static.split("/");
    thumb_name = thumb_name[thumb_name.length-1];

    var link = $(elem).find('a');
    var img = $(link).find('img');
    var thumbs_url = $(elem).attr('data-thumbs-url');

    link.click(function() {
      scrim(1, function() {
        var offset = 225;
        $('#subcontent .container').empty();
        $('#subcontent').css({
            width : window.innerWidth - offset + "px",
            height : window.innerHeight - offset + "px",
            top : offset / 2,
            left : offset / 2
          })
          .fadeIn(100);
        $('#subcontent .container').text("loading...");

        // scrape archive.org for thumbs to insert
        $.getJSON('/thumbs/?url=' + thumbs_url, function(data) {
          $('#subcontent .container').empty();
          var destElem = '#subcontent .container';
          $('<ul/>', {
            'class': 'thumbs',
            html: ""
          }).appendTo(destElem);
          $.each(data.links, function(key, thumb) {
            // thumb.url
            $('<li><a href="#"><img src="' + thumb.img + '"></a></li>')
              .appendTo(destElem + ' ul.thumbs')
              .click(function(){
                var c = $('#subcontent .container');
                //thumb.url
                c.html('<iframe id="videoplayer" src="' + thumb.url + '"></iframe>');
              })
          });
        });
      });
      return false;
    });
    link.hover(function() {
      img.attr('src', 'gifs/prelinger_anim/' + thumb_name);
    });
    link.mouseout(function() {
      img.attr('src', 'gifs/prelinger_static/' + thumb_name);
    });
  });
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


var scrim = function(visible, callback) {
  var s = $('#scrim');
  if (visible == 1)
    s.fadeIn(150, callback);
  else
    s.fadeOut(150, callback);
};
