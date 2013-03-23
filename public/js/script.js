
$(document).ready(function() {

  $(document.body).append('<div id="scrim" />');
  $(document.body).append('<div id="subcontent"><div class="container"></div></div>');
  $('#scrim').click(function() {
    $('#subcontent').fadeOut(100, function() {
      scrim(0);
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
        $('#subcontent .container').empty();

        var offset = 150;

        $('#subcontent').css({
            width : window.innerWidth - offset + "px",
            height : window.innerHeight - offset + "px",
            top : offset / 2,
            left : offset / 2
          })
          .fadeIn(100);

        $('#subcontent .container').text("loading...");

        $.getJSON('/thumbs/?url=' + thumbs_url, function(data) {
          $('#subcontent .container').empty();
          var destElem = '#subcontent .container';

          // $('<div/>', {
          //   'class' : 'desc',
          //   html : '<p><a target="_blank" href="' + data.url + '"> ' + data.url + ' </a></p>'
          // }).appendTo(destElem);

          $('<ul/>', {
            'class': 'thumbs',
            html: ""
          }).appendTo(destElem);

          $.each(data.links, function(key, thumb) {
            $('<li><a target="_blank" href="'+thumb.url+'"><img src="' + thumb.img + '"></a></li>')
              .appendTo(destElem + ' ul.thumbs')
          });

        });

        // $.load("/proxy/?url=" + thumbs_url + ' div.box div ', function(response, status, xhr) {
        //   // alert('Load was performed.');
        //   console.log(response);
        // });

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

var scrim = function(visible, callback) {
  var s = $('#scrim');
  if (visible == 1)
    s.fadeIn(150, callback);
  else
    s.fadeOut(150, callback);
}


//onmouseout="this.src=\'prelinger_static/'+t+'\'" onmouseover="this.src=\'prelinger/'+t+'\'"
