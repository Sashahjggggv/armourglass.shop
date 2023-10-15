jQuery(function($) {
    $('.SelectBox.department').SumoSelect();
});

jQuery(function($) {
    let type = $("input[name='delivery']:checked").val();
    
    if (type) {
        $("#citys").autocomplete({
            source: function(request, response) {
                $.ajax({
                    type: "post",
                    url: '/client/getNovaPoshta',
                    data: {
                        "request_term": request.term,
                        "lang": lang
                    },
                    dataType: 'JSON',
                    success: function(data) {
                        if (!data.data.length) return
                        var list = new Set();
                        for (let key of data.data[0].Addresses) {
                            list.add({ city: key.MainDescription + ` (${key.Area})`, id: key.DeliveryCity });
                        }
                        list = [...list];

                        response($.map(list, function(item) {
                            return {
                                label: item.city,
                                value: item.city,

                                id: item.id
                            };


                        }));
                    },
                    error: function(data) {
                        console.warn(data)
                    }
                })
            }

        }).autocomplete('instance')._renderItem = function(ul, item) {

            return $('<li>')
                .append('<div  tabindex="-1"  class="ui-menu-item-wrapper" data-cityid="' + item.id + '">' + item.value + '</div>')
                .appendTo(ul);
        };
    }
})
var selectes = document.getElementById('citys');

$(document).on('click', ".ui-menu-item .ui-menu-item-wrapper", function(e) {
    var valueSelected = this.dataset.cityid
    $.ajax({
        type: "post",
        url: '/client/getNovaPoshta',
        data: {
            "second_req": true,
            "value_selected": valueSelected,
            "lang": lang

        },
        dataType: 'JSON',
        success: function(data) {
            $('#myselect').empty();
            $('.input-wrapp-vidilena').find('.inputError').remove();

            var sel = document.getElementById('myselect');
            if (!data.data.length) {

                sel.append(new Option(" "))
                $('#myselect')[0].sumo.reload();
            } else

                for (var i = 0; i < data.data.length; i++) {

                sel.append(new Option(data.data[i].Description))
            }
            $('#myselect')[0].sumo.reload();
        },
        error: function(data) {
            console.warn(data)
        }
    })
})

jQuery('#citys').on('keydown', function(e) {
    if (e.which == 8 || e.which == 46) return $('#myselect').empty();

});