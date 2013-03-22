$(document).ready(function() {
  $.each( $('.thumbs li'), function( key, elem ) {

    var id = $(elem).attr('id')
    var thumb_static = $(elem).find('img').attr('src');
    var thumb_name = thumb_static.split("/");
    thumb_name = thumb_name[thumb_name.length-1];
    var img = $(elem).find('img');

    $(elem).find('a').hover(function() {
      img.attr('src', 'prelinger_anim/' + thumb_name);
    });
    $(elem).find('a').mouseout(function() {
      img.attr('src', 'prelinger_static/' + thumb_name);
    });
  });
});


//onmouseout="this.src=\'prelinger_static/'+t+'\'" onmouseover="this.src=\'prelinger/'+t+'\'"
