
    function promotions_products_ajax() {


        let sortBy = $('.promotions-products-sort').val()
        let checkedCategories = []
        $('.promotions-products-categories').each(function() {
            var sThisVal = (this.checked ? $(this).data("category_id") : "");
            if (sThisVal) checkedCategories.push(sThisVal)
        });


         let data = {
                current_page: 1,
                per_page: 16,
                checkedCategories,
                sortBy
            }



        // if($('.width-range-division').attr('data-triggered') == "true"){
        //     data.min_s = $('.width-range-input-min').val();
        //     data.max_s = $('.width-range-input-max').val();
        //     data.width_triggered = true
        // }



        // if($('.height-range-division').attr('data-triggered') == "true"){
        //     data.min_h = $('.height-range-input-min').val();
        //     data.max_h = $('.height-range-input-max').val();
        //     data.height_triggered = true
        //}


        
        activeLink = activeLink.replace(/\?.*$/, "") + "?" + jQuery.param(data);
        $.ajax({
            type: "post",
            url: activeLink,
            data: data,
            dataType: 'JSON',
            success: function(data) {
                $('.total-products-found').html(`${data.products_count}`)
                $('.promotions_products').html(data.html)
                $('.custom-pagination').html(data.pagination);
                $('.show-more-wrapper').html(data.show_more)
                // for(let i =0; i < $('.item-pagination-blog a').length; i++){
                //     let arr  = category_id.split('?')
                //     let str = arr[1]
                //     let arr2 = str.split('&')
                //     let currPage = arr2[0]
                //     currPage = `current_page=${i+1}`
                //     arr2[0] = currPage
                //     arr2 = arr2.join("&")
                //     arr[0] = arr[0]+"?"
                //     let res = arr[0] + arr2
                //    $('.item-pagination-blog a')[i].href = res
                // }


                if ($('.total-products-found').html() == 0){
                    $('.promotions-products-categories').each(function(){
                        $(this).prop('checked',false)
                    })
                }

                window.history.pushState(activeLink, "", activeLink);

                // $('.width #slider-range-input').data('min', data.min_s)
                //     $('.width #slider-range-input').data('max', data.max_s)

                //     $('.height #slider-range-input').data('min', data.min_h)
                //     $('.height #slider-range-input').data('min', data.max_h)

                //     $('.width-range-input-min').val(data.min_s)
                //     $('.width-range-input-max').val(data.max_s)

                //     $('.height-range-input-min').val(data.min_h)
                //     $('.height-range-input-max').val(data.max_h)

                //     $(".width-range #slider-range-input").data("ionRangeSlider").update({
                //         min: data.min_s,
                //         max: data.max_s,
                //        from: data.min_s,
                //       to: data.max_s
                //     });
                //     $(".height-range #slider-range-input").data("ionRangeSlider").update({
                //         min: data.min_h,
                //         max: data.max_h,
                //        from: data.min_h,
                //       to: data.max_h
                //     });
            },
            error: function(data) {
                console.warn(data)
            }
        }).done(function() {

            $('#loading').hide();
        });
        return false
    }










    if ($('.promotions_products')) {
        $(document).on('click','.promotions-products-categories', function(){
            promotions_products_ajax()
        })

        // $( document ).ready(function() {
        //     $('.slider-range').each(function(index, element) {
        //         $(this).find('#slider-range-input').data('ionRangeSlider').options.onFinish = function(e) {
        //         element.dataset.triggered = "true"
        //         promotions_products_ajax()
        //         };
        //     });
        // });
    



        $('.promotions-products-sort').change(function() {
            promotions_products_ajax()
        })
        $(document).on('click','.sidebar-btn-reset',function() {
            activeLink = activeLink.replace(/\?.*$/, "");
            $.ajax({
                type: "post",
                url: activeLink,
                data: {
                    current_page: 1,
                    per_page: 16,
                   // sortBy: 1
                },
                dataType: 'JSON',
                success: function(data) {
                    $('.total-products-found').html(`${data.products_count}`)
                    $('.promotions_products').html(data.html)
                    $('.custom-pagination').html(data.pagination);
                    $('.show-more-wrapper').html(data.show_more)
                    if($('.seo-section')) $('.seo-section').parent().parent().remove()
                    window.history.pushState(activeLink, "", activeLink);


                //     $('.width #slider-range-input').data('min', data.min_s)
                //     $('.width #slider-range-input').data('max', data.max_s)
                    

                //     $('.height #slider-range-input').data('min', data.min_h)
                //     $('.height #slider-range-input').data('min', data.max_h)



                //    $('.width-range-division').attr('data-triggered', 'false')
                //     $('.height-range-division').attr('data-triggered', 'false')




                //     $('.width-range-input-min').val(data.min_s)
                //     $('.width-range-input-max').val(data.max_s)

                //     $('.height-range-input-min').val(data.min_h)
                //     $('.height-range-input-max').val(data.max_h)

                //     $(".width-range #slider-range-input").data("ionRangeSlider").update({
                //         min: data.min_s,
                //         max: data.max_s,
                //         from: data.min_s,
                //         to: data.max_s
                //     });
                   

                //     $(".height-range #slider-range-input").data("ionRangeSlider").update({
                //         min: data.min_h,
                //         max: data.max_h,
                //         from: data.min_h,
                //         to: data.max_h
                //     });

                    // document.querySelectorAll('.promotions-products-categories').forEach((item) => {
                    //     item.removeAttribute("disabled", true);
                    // })

                     $('.promotions-products-categories').each(function(){
                        $(this).prop('checked',false)
                    })

                },
                error: function(data) {
                    console.warn(data)
                }
            }).done(function() {
                $('#loading').hide();
            });
            return false
        })
    }