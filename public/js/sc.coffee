extended_json = {}
$ = JQuery

on_filter_change = () ->
    query = $('#filter').val().toLowerCase();
    $('.thumbs li').hide()
    d = $.grep(extended_json.clips
        (clip, i) ->
            clip_id = clip.id.toLowerCase()
            clip_desc = clip.description.toLowerCase() if clip.description
            if clip_id.indexOf(query) >= 0 or clip_desc.indexOf(query) >= 0
                true
            if clip.subject
                for subject in clip.subject
                    if q.toLowerCase().indexOf(query) >= 0
                        true
        )
    for filter in d
        $('.thumbs li#' + filter.id).show()
    false

scrim = (visible, callback) ->
    s = $('#script')
    if visible = 1 then s.fadeIn(150, callback)
    else s.fadeout(150, callback)
