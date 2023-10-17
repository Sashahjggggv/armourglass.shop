// =============================
    // PAGINATION
    // =============================
    $(document).on('click', '.custom-pagination .item-pagination-blog', function() {
        let page;
        let data = {};
        if ($(this).hasClass('pag-arrow arr-left') || $(this).hasClass('pag-arrow arr-right')) {
            let currentPage = $('.custom-pagination .active').attr('data-id');
            page = $(this).hasClass('pag-arrow arr-left') ? parseInt(currentPage) - 1 : parseInt(currentPage) + 1;

        } else {
            $('.custom-pagination .item-pagination-blog').removeClass('active');
            $(this).addClass('active');
            page = $(this).attr('data-id');
        }

        let activeLink = window.location.pathname;
        let promotions_product_page_link = $('.promotions_products').data("page_slug")
        let category_id = $('.category-product-row').data("category_slug")
        //let selectedCategory = $('.search-product-row').data("category_id")
        let search = $('.search-row').data("search")
        data.current_page = page

        let promotionsSortBy = $('.promotions-products-sort').val()
        let categorySortBy = $('.category-products-sort').val()
        let checkedCategories = []
        $('.promotions-products-categories').each(function() {
            var sThisVal = (this.checked ? $(this).data("category_id") : "");
            if (sThisVal) checkedCategories.push(sThisVal)
        });
    

        
        let attributes = []
        $('.attr-filter input:checkbox').each(function() {
            let attr_id = (this.checked ? $(this).data("attribute_id") : "");
            let val = (this.checked ? $(this).data("attr_value") : "");
            if (val) {
                attributes.push({ attr_id, val })
            }
        });
        // let options = []
        // $('.opt-filter input:checkbox').each(function() {
        //     let group_attr_id = (this.checked ? $(this).data("group_id") : "");
        //     if (group_attr_id) {
        //         options.push(group_attr_id)
        //     }
        // });


        if($('.width-range-division').attr('data-triggered') == "true"){
            data.min_s = $('.width-range-input-min').val();
            data.max_s = $('.width-range-input-max').val();
            data.width_triggered = true
        }



        if($('.height-range-division').attr('data-triggered') == "true"){
            data.min_h = $('.height-range-input-min').val();
            data.max_h = $('.height-range-input-max').val();
            data.height_triggered = true
        }



        let per_page

        if (category_id) {
            per_page = 16
            data.per_page = per_page,
                data.attributes = attributes,
                //data.options = options,
                data.sortBy = +categorySortBy
        } else if (promotions_product_page_link) {
            per_page = 16
                data.per_page = per_page,
                data.checkedCategories = checkedCategories,
                data.sortBy = +promotionsSortBy
        } else if (activeLink == "/search" || activeLink == `/${lang}/search`) {
            per_page = 16
            data.per_page = per_page,
            data.search = search
        } else {
            per_page = 9
            data.per_page = per_page
        }

        activeLink = activeLink.replace(/\?.*$/, "") + "?" + jQuery.param(data);
        
        $.ajax({
            type: "post",
            url: activeLink,
            data: data,
            dataType: 'JSON',
            success: function(data) {
                if(data.gTagData){
                    data.gTagData = JSON.parse(data.gTagData)
                    gtag("event", "view_item_list", data.gTagData)
                } 

                window.history.pushState(activeLink, "", activeLink);
                
                $('.row-reviews').html(data.html);
                $('.product-row').html(data.html)
                $('.promotions-products').html(data.html)
               // $('.category-product-row').html(data.html)
               $('.show-more-wrapper').html(data.show_more)
                $('.blog-row').html(data.html);
                //$('.search-product-row').html(data.html)
                $('.promotion-row').html(data.html);
                $('.custom-pagination').html(data.pagination);
                if($('.seo-section')) $('.seo-section').parent().parent().remove()
                $('html, body').animate({ scrollTop: 0 }, 0);
            },
            error: function(data) {

            }
        }).done(function() {
            // hide spinner
            $('#loading').hide();
        });
        return false
    });











    // =============================
    // PAGINATION APPEND
    // =============================
    $(document).on('click', '#load-more', function() {
        let page;
        let data = {};
        let curr_page = $(this).attr('data-id')
            page = +curr_page + 1



        let activeLink = window.location.pathname;
        let promotions_product_page_link = $('.promotions_products').data("page_slug")
        let category_id = $('.category-product-row').data("category_slug")
        //let selectedCategory = $('.search-product-row').data("category_id")
        let search = $('.search-row').data("search")
        data.current_page = page

        let promotionsSortBy = $('.promotions-products-sort').val()
        let categorySortBy = $('.category-products-sort').val()
        let checkedCategories = []
        $('.promotions-products-categories').each(function() {
            var sThisVal = (this.checked ? $(this).data("category_id") : "");
            if (sThisVal) checkedCategories.push(sThisVal)
        });
    

        
        let attributes = []
        $('.attr-filter input:checkbox').each(function() {
            let attr_id = (this.checked ? $(this).data("attribute_id") : "");
            let val = (this.checked ? $(this).data("attr_value") : "");
            if (val) {
                attributes.push({ attr_id, val })
            }
        });
        // let options = []
        // $('.opt-filter input:checkbox').each(function() {
        //     let group_attr_id = (this.checked ? $(this).data("group_id") : "");
        //     if (group_attr_id) {
        //         options.push(group_attr_id)
        //     }
        // });

        if($('.width-range-division').attr('data-triggered') == "true"){
            data.min_s = $('.width-range-input-min').val();
            data.max_s = $('.width-range-input-max').val();
            data.width_triggered = true
        }



        if($('.height-range-division').attr('data-triggered') == "true"){
            data.min_h = $('.height-range-input-min').val();
            data.max_h = $('.height-range-input-max').val();
            data.height_triggered = true
        }



        let per_page

        if (category_id) {
            per_page = 16
            data.per_page = per_page,             
                data.attributes = attributes,
               // data.options = options,
                data.sortBy = +categorySortBy
        } else if (promotions_product_page_link) {
            per_page = 16
                data.per_page = per_page,
                data.checkedCategories = checkedCategories,
                data.sortBy = +promotionsSortBy
        } else if (activeLink == "/search" || activeLink == `/${lang}/search`) {
            per_page = 16
            data.per_page = per_page,
            data.search = search
        } else {
            per_page = 9
            data.per_page = per_page
        }

        activeLink = activeLink.replace(/\?.*$/, "") + "?" + jQuery.param(data);
        
        $.ajax({
            type: "post",
            url: activeLink,
            data: data,
            dataType: 'JSON',
            success: function(data) {
                if(data.gTagData){
                    data.gTagData = JSON.parse(data.gTagData)
                    gtag("event", "view_item_list", data.gTagData)
                } 

                window.history.pushState(activeLink, "", activeLink);
                
                $('.row-reviews').append(data.html);
                $('.product-row').append(data.html)
                $('.promotions-products').html(data.html)
               // $('.category-product-row').html(data.html)
                $('.blog-row').append(data.html);
                //$('.search-product-row').html(data.html)
                $('.promotion-row').append(data.html);
                $('.custom-pagination').html(data.pagination);
                $('.show-more-wrapper').html(data.show_more)
                if($('.seo-section')) $('.seo-section').parent().parent().remove()
                //$('html, body').animate({ scrollTop: 0 }, 0);
            },
            error: function(data) {

            }
        }).done(function() {
            // hide spinner
            $('#loading').hide();
        });
        return false
    });