let _functions = {},
    winW, winH, winScr, isTouchScreen, isAndroid, isIPhone, is_Mac, is_IE, is_Chrome;

jQuery(function($) {

    "use strict";

    /* function on page ready */
    isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        isAndroid = navigator.userAgent.match(/Android/i),
        isIPhone = navigator.userAgent.match(/iPhone/i),
        is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;

    const $body = $('body');

    $body.addClass('loaded');
    const lang = $('body').data("lang")
    setTimeout(function() {
        $('body').addClass('site-ready');
    }, 1000);

    if (isTouchScreen) {
        $('html').addClass('touch-screen');
    }

    if (isAndroid) {
        $('html').addClass('android');
    }$('html')
    if (isIPhone) {
        $('html').addClass('ios');
    }
    if (is_Mac) {
        $('html').addClass('mac');
    }
    if (is_IE) {
        $('html').addClass('ie');
    }
    if (is_Chrome) {
        $('html').addClass('chrome');
    }


    _functions.pageCalculations = function() {
        winW = $(window).width();
        winH = $(window).height();
    }

    _functions.pageCalculations();

    // =============================
    // Cookie 
    // =============================
    function readCookie(name) {
        let nameEQ = encodeURIComponent(name) + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    function createCookie(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }


    //rellax
    setTimeout(function() {
        if (!is_IE && $('.rellax').length && $(window).width() > 1199) {
            var rellax = new Rellax('.rellax', {
                center: true
            });
        }
    }, 1000);




    //menu
    $(document).on('click', '.burger', function(e) {
        $(this).find('.hamburger ').toggleClass('is-active');
        $('html').toggleClass('overflow-menu');
        $(this).parents('header').toggleClass('open-menu');
        $('.sidebar').removeClass('active');
        $('.sidebar-btn').removeClass('active');
        $('html').removeClass('overflow-sidebar');
    });




    /* function on page scroll */
    $(window).scroll(function() {
        _functions.scrollCall();
    });


    var prev_scroll = 0;
    _functions.scrollCall = function() {
        winScr = $(window).scrollTop();
        if (winScr > prev_scroll) {
            $('header').addClass('scrolled');
        } else {}
        prev_scroll = winScr;

        if (winScr <= 10) {
            $('header').removeClass('scrolled');
            prev_scroll = 0;
        }
    }
    _functions.scrollCall();

    setTimeout(_functions.scrollCall, 0);

    /* function on page resize */
    _functions.resizeCall = function() {
        setTimeout(function() {
            _functions.pageCalculations();
        }, 100);
        // _functions.stickyInit();
    };

    if (!isTouchScreen) {
        $(window).resize(function() {
            _functions.resizeCall();
            $(".sticky-item").trigger("sticky_kit:recalc");
            $(".sticky-gap-item").trigger("sticky_kit:recalc");
        });
    } else {
        window.addEventListener("orientationchange", function() {
            _functions.resizeCall();
        }, false);
    }

    /* swiper sliders */
    _functions.getSwOptions = function(swiper) {
        let options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        const $p = swiper.closest('.swiper-entry'),
            slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;
        if (!options.pagination) options.pagination = {
            el: $p.find('.swiper-pagination')[0],
            clickable: true
        };
        if (!options.navigation) options.navigation = {
            nextEl: $p.find('.swiper-button-next')[0],
            prevEl: $p.find('.swiper-button-prev')[0]
        };
        options.preloadImages = false;
        options.lazy = {
            loadPrevNext: true
        };
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.centerInsufficientSlides = true;
        if (!options.speed) options.speed = 500;
        options.roundLengths = true;
        if (isTouchScreen) options.direction = "horizontal";
        if (slidesLength <= 1) {
            options.loop = false;
            $p.find('.swiper-wrapper').css({
                "cursor": "default"
            })
        }
        if (options.customFraction) {
            $p.addClass('custom-fraction');
            if (slidesLength > 1 && slidesLength < 10) {
                $p.find('.custom-current').text('1');
                $p.find('.custom-total').text(slidesLength);
            } else if (slidesLength > 1) {
                $p.find('.custom-current').text('1');
                $p.find('.custom-total').text(slidesLength);
            }
        }
        return options;
    };
    _functions.initSwiper = function(el) {
        const swiper = new Swiper(el[0], _functions.getSwOptions(el));
    };

    //configurator
    _functions.getProductOptions = function(el) {
        let atrNames = ['thickness', 'facet', 'main_lighting', 'backlight', 'heating', 'lens',
            'lens-type', 'lens-sub-type', 'clock', 'clock_value', 'audio', 'audio_value', 'shelf', 'accessories', 'set_accessories', 'towel_rail', 'tempering_glass',
            'tempering_glass_value', 'shower_shelf', 'mounting_system', 'entrance_part', 'door_hinges', 'door_handles', 'opening_door', 'handle_type', 'handle_type_value',
            'special_installation', 'placement_partition', 'upper_corner', 'type_sealant', 'glass_holder', 'shelf_type', 'shelf_type_value', 'switch-type-1',
            'switch-8', 'switch-9', 'switch-10', 'switch-95', 'switch-96', 'switch-97','switch-98','switch-99','switch-100','switch-101','switch-102','switch-103', 'lens-type-detail', 'color','protect_glass'
        ];

        let data = [];
        $("input[type=radio]:checked").each(function() {
            let atrName = $(this).attr('name');
            let originAtrGrId = $(this).attr('data-atr-gr-id');
            let originAtrId = $(this).attr('data-origin-atr-id');
            let originAtrValueId = $(this).attr('data-atr-value');
            let dependAtrId = $(this).attr('data-depend-atr-id');
            if(atrName){
                if (atrNames.includes(atrName) || atrName.split('-')[0] == 'facet') {
                    data.push({
                        originAtrGrId: originAtrGrId ? originAtrGrId : "",
                        originAtrId: originAtrId ? originAtrId : "",
                        originAtrValueId: originAtrValueId ? originAtrValueId : "",
                        dependAtrId: dependAtrId ? dependAtrId : ""
                    })
                }
            }
        });
        $("input[type=checkbox]:checked").each(function() {
            let atrName = $(this).attr('name');
            let originAtrGrId = $(this).attr('data-atr-gr-id');
            let originAtrId = $(this).attr('data-origin-atr-id');
            let originAtrValueId = $(this).attr('data-atr-value');
            let dependAtrId = $(this).attr('data-depend-atr-id');
            if(atrName){
                if (atrNames.includes(atrName) || atrName.split('-')[0] == 'facet') {
                    data.push({
                        originAtrGrId: originAtrGrId ? originAtrGrId : "",
                        originAtrId: originAtrId ? originAtrId : "",
                        originAtrValueId: originAtrValueId ? originAtrValueId : "",
                        dependAtrId: dependAtrId ? dependAtrId : ""
                    })
                }
            }
        });

        $('.switch-block').each(function(){
            let switch_type = $(this).closest('.col-12').find(".switch_types option:selected")
            let atrName = switch_type.attr('name');
            let originAtrGrId = switch_type.attr('data-atr-gr-id');
            let originAtrId = switch_type.attr('data-origin-atr-id');
            let dependAtrId = switch_type.attr('data-depend-atr-id');
            let originAtrValueId = "" 

            if(atrName){
                if (atrNames.includes(atrName) || atrName.split('-')[0] == 'facet') {
                    data.push({
                        originAtrGrId: originAtrGrId ? originAtrGrId : "",
                        originAtrId: originAtrId ? originAtrId : "",
                        originAtrValueId: "",
                        dependAtrId: dependAtrId ? dependAtrId : ""
                    })
                }
            }
            
            
                
                let switch_type_parentID = switch_type.attr('some-attr');

                $('.dropdown-item-child select').each(function() {
                    if($(this).attr('some-attr') == switch_type_parentID){
                        if($(this).find("option:selected")){
                            originAtrValueId =  $(this).find("option:selected").attr('data-atr-value');
                        }
                    }
                });
                if(atrName){
                    if (atrNames.includes(atrName) && originAtrValueId || atrName.split('-')[0] == 'facet') {
                        data.push({
                            originAtrGrId: "",
                            originAtrId: originAtrId ? originAtrId : "",
                            originAtrValueId: originAtrValueId ? originAtrValueId : "",
                            dependAtrId: dependAtrId ? dependAtrId : ""
                        })
                    }
                }
           
        })


        if (data && data.length) {
            let final_arr = []
            let atrArr = data.filter(i => i.originAtrId && !i.originAtrValueId ); //
            if (atrArr && atrArr.length) {
                for (let atr of atrArr) {
                    let val = data.find(i => i.originAtrId == atr.originAtrId && i.originAtrValueId);
                    atr.originAtrValueId = val && val.originAtrValueId ? val.originAtrValueId : "";
                }
                atrArr.forEach(item => {
                    if(item.dependAtrId){
                        let val = data.find(i => i.originAtrId == item.dependAtrId);
                        if(val) final_arr.push(item)
                    } else {
                        final_arr.push(item)
                    }
                })
            }
            data = final_arr;
        }

        return data;

    };

    $('.swiper-entry .swiper-container').each(function() {
        _functions.initSwiper($(this));
    });
    $('.swiper-thumbs').each(function() {
        let top = $(this).find('.swiper-container.swiper-thumbs-top')[0].swiper,
            bottom = $(this).find('.swiper-container.swiper-thumbs-bottom')[0].swiper;
        top.thumbs.swiper = bottom;
        top.thumbs.init();
        top.thumbs.update();
    });
    $('.swiper-control').each(function() {
        let top = $(this).find('.swiper-container')[0].swiper,
            bottom = $(this).find('.swiper-container')[1].swiper;
        top.controller.control = bottom;
        bottom.controller.control = top;
    });


    //custom fraction
    $('.custom-fraction').each(function() {
        var $this = $(this),
            $thisSwiper = $this.find('.swiper-container')[0].swiper;

        $thisSwiper.on('slideChange', function() {
            $this.find('.custom-current').text(
                function() {
                    if ($thisSwiper.realIndex < 9) {
                        return ($thisSwiper.realIndex + 1)
                    } else {
                        return $thisSwiper.realIndex + 1
                    }
                }
            )
        });
    });


    // video stop/play 
    $('.banner-slider').each(function() {
        let $thisSwiper = $('.banner-slider').find('.swiper-container')[0].swiper;

        $thisSwiper.on('slideChange', function() {

            var $cSlides = $('.swiper-container').find('.banner-slide');
            _functions.customSlide($thisSwiper, $cSlides);

        });
    });
    _functions.customSlide = function(swiperObj, $customSlides) {
        var slideTo = $customSlides.eq(swiperObj.activeIndex),
            slideFrom = $customSlides.eq(swiperObj.previousIndex);

        var prevSlideVideo = slideFrom.find('video'),
            activeSlideVideo = slideTo.find('video');

        if (prevSlideVideo.length) prevSlideVideo[0].pause();
        if (prevSlideVideo.length) prevSlideVideo[0].currentTime = 0;
        if (activeSlideVideo.length) activeSlideVideo[0].play();
    }





    //popup
    let popupTop = 0;
    _functions.removeScroll = function() {
        popupTop = $(window).scrollTop();
        $('html').css({
            "top": -$(window).scrollTop(),
            "width": "100%"
        }).addClass("overflow-hidden");
    }
    _functions.addScroll = function() {
        $('html').css({}).removeClass("overflow-hidden");
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function(popup) {
        $('.popup-content').removeClass('active');
        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function() {
        $('.popup-wrapper, .popup-content').removeClass('active');

        // $('.popup-iframe').html('');
        $('#video-popup iframe').remove();

        _functions.addScroll();
    };

    _functions.textPopup = function(title, description) {
        $('#text-popup .text-popup-title').html(title);
        $('#text-popup .text-popup-description').html(description);
        _functions.openPopup('#text-popup');
    };


    $(document).on('click', '.open-popup', function(e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .close-popup, .popup-wrapper .layer-close', function(e) {
        e.preventDefault();
        _functions.closePopup();
    });

    // detect if user is using keyboard tab-button to navigate
    // with 'keyboard-focus' class we add default css outlines
    function keyboardFocus(e) {
        if (e.keyCode !== 9) {
            return;
        }

        switch (e.target.nodeName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                break;
            default:
                document.documentElement.classList.add('keyboard-focus');
                document.removeEventListener('keydown', keyboardFocus, false);
        }
    }
    document.addEventListener('keydown', keyboardFocus, false);



    /*video pop-up*/
    $(document).on('click', '.video-open', function(e) {
        e.preventDefault();
        var video = $(this).attr('href');
        $('.video-popup-container iframe').attr('src', video);
        $('.video-popup').addClass('active');
        $('html').addClass('overflow-hidden');
    });
    $('.video-popup-close, .video-popup-layer').on('click', function(e) {
        $('html').removeClass('overflow-hidden');
        $('.video-popup').removeClass('active');
        $('.video-popup-container iframe').attr('src', 'about:blank');
        e.preventDefault();
    });



    /*---- product -----*/
    // add to favourite
    $('.js-product-detail .fav-btn').on('click', function() {
        $(this).toggleClass('active');
    });

    //plus-minus
    $(document).on('click', '.decrement', function() {
        let $this = $(this),
            $input = $this.parent().find('input'),
            hasMin = $input[0].hasAttribute('data-min'),
            value = parseInt($input.val(), 10),
            min = hasMin ? +$input.attr('data-min') : 1;


            if($(this).attr('data-from-cart')){
                if($(this).attr('data-product_type') == 'prod'){
                    let product_id = $(this).attr('data-product_id');
                    let product_count = 1
                    let product_s = $(this).attr('data-product_s');
                    let product_h = $(this).attr('data-product_h');
                    let product_l = $(this).attr('data-product_l');
                    let product_l1 = $(this).attr('data-product_l1');
                    let product_l2 = $(this).attr('data-product_l2');
                    let product_m = $(this).attr('data-product_m');
                    let product_d = $(this).attr('data-product_d');
                    let product_b1 = $(this).attr('data-product_b1');
                    let product_b2 = $(this).attr('data-product_b2');
                    let prod_cats = $(this).data('product_cats')
                    let prod_type = $(this).data('prod_type');
                    let final_price = $(this).data('price')
                    let variation_value = $(this).data('variation_value');
                    let product_name = $(this).data('name');
            
                    let sizes = ''
                        switch(prod_type){
                            case 1:sizes = `${product_s}x${product_h}`
                            break;
                            case 2: {
                                if(product_h) sizes+=`${product_h}x`
                                if(product_s) sizes+=`${product_s}x`
                                if(product_d) sizes+=`${product_d}x`
                                if(product_m) sizes+=`${product_m}x`
                                if(product_l) sizes+=`${product_l}x`
                                if(product_l1) sizes+=`${product_l1}x`
                                if(product_l2) sizes+=`${product_l2}x`
                                if(product_b1) sizes+=`${product_b1}x`
                                if(product_b2) sizes+=`${product_b2}x`
            
                                sizes = sizes.split('')
                                sizes[sizes.length-1] = ""
                                sizes = sizes.join('')
                            }
                            break;
                            case 4:  sizes = variation_value
                            break;
                        }
            
                    let gTagData = {
                        currency: "UAH",
                        value: parseFloat(product_count) * parseFloat(final_price),
                        items: [ 
                            {
                                item_id: product_id,
                                item_name: product_name,
                                item_variant: sizes,
                                google_business_vertical: "retail",
                                price: final_price,
                                quantity: product_count
                            }
                        ]
                    }
            
                    if(prod_cats){
                        for(let i=0;i<prod_cats.length;i++){
                            let keyName = i == 0 ? 'item_category' : `item_category${i+1}`
                            if(i == 0) gTagData.items[0][keyName] = prod_cats[i]
                            if(i != 0) gTagData.items[0][keyName] = prod_cats[i]
                        }
                    }
                    gtag("event", "remove_from_cart", gTagData)
                } else {
    
                    let gTagData = {
                        currency: "UAH",
                        value: $(this).closest('.prod_cheaper').attr('data-price'),
                        items: []
                    }
    
    
                    let product_s = $(this).attr('data-product_s');
                    let product_h = $(this).attr('data-product_h');
                    let product_l = $(this).attr('data-product_l');
                    let product_l1 = $(this).attr('data-product_l1');
                    let product_l2 = $(this).attr('data-product_l2');
                    let product_m = $(this).attr('data-product_m');
                    let product_d = $(this).attr('data-product_d');
                    let product_b1 = $(this).attr('data-product_b1');
                    let product_b2 = $(this).attr('data-product_b2');
                    let prod_cats = $(this).data('product_cats')
                    let prod_type = $(this).data('prod_type');
    
    
                    let sizes = ''
                        switch(prod_type){
                            case 1:sizes = `${product_s}x${product_h}`
                            break;
                            case 2: {
                                if(product_h) sizes+=`${product_h}x`
                                if(product_s) sizes+=`${product_s}x`
                                if(product_d) sizes+=`${product_d}x`
                                if(product_m) sizes+=`${product_m}x`
                                if(product_l) sizes+=`${product_l}x`
                                if(product_l1) sizes+=`${product_l1}x`
                                if(product_l2) sizes+=`${product_l2}x`
                                if(product_b1) sizes+=`${product_b1}x`
                                if(product_b2) sizes+=`${product_b2}x`
            
                                sizes = sizes.split('')
                                sizes[sizes.length-1] = ""
                                sizes = sizes.join('')
                            }
                            break;
                            case 4:  sizes = variation_value
                            break;
                        }
    
    
    
                    let firstElObj = {
                        item_id : $(this).attr('data-product_id'),
                        item_name : $(this).attr('data-name'),
                        price: $(this).attr('data-prod_price'),
                        google_business_vertical: "retail",
                        item_variant: sizes,
                        quantity: 1
                    }
    
                    gTagData.items.push(firstElObj)
    
                    let together_cheaper = $(this).attr('data-together-cheaper')
                    if(together_cheaper) together_cheaper = JSON.parse(together_cheaper)
                    if(together_cheaper && together_cheaper.length){
                        //let totalValue = 0
                        for(let item of together_cheaper){
                            
                            let obj = {
                                item_id: item?.id,
                                google_business_vertical: "retail",
                                quantity: 1,
    
                            }
    
                            let price = item.promotional_price
                            let product_name =item.name
                            let product_s = $(`.together-cheaper-product-id-${item.id}`).attr('data-s');
                            let product_h = $(`.together-cheaper-product-id-${item.id}`).attr('data-h');
                            let product_l = $(`.together-cheaper-product-id-${item.id}`).attr('data-l');
                            let product_l1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l1');
                            let product_l2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l2');
                            let product_m = $(`.together-cheaper-product-id-${item.id}`).attr('data-m');
                            let product_d = $(`.together-cheaper-product-id-${item.id}`).attr('data-d');
                            let product_b1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b1');
                            let product_b2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b2');
                            let prod_cats =$(`.together-cheaper-product-id-${item.id}`).data('product_cats')
                            let prod_type = $(`.together-cheaper-product-id-${item.id}`).data('product_type');
                            let variation_value = $(`.together-cheaper-product-id-${item.id}`).data('variation_value');
        
                            let sizes = ''
                            switch(prod_type){
                                case 1:sizes = `${product_s}x${product_h}`
                                break;
                                case 2: {
                                    if(product_h) sizes+=`${product_h}x`
                                    if(product_s) sizes+=`${product_s}x`
                                    if(product_d) sizes+=`${product_d}x`
                                    if(product_m) sizes+=`${product_m}x`
                                    if(product_l) sizes+=`${product_l}x`
                                    if(product_l1) sizes+=`${product_l1}x`
                                    if(product_l2) sizes+=`${product_l2}x`
                                    if(product_b1) sizes+=`${product_b1}x`
                                    if(product_b2) sizes+=`${product_b2}x`
        
                                    sizes = sizes.split('')
                                    sizes[sizes.length-1] = ""
                                    sizes = sizes.join('')
                                }
                                break;
                                case 4:  sizes = variation_value
                                break;
                            }
        
                            obj.item_name = product_name
                            obj.item_variant = sizes
                            obj.price = price
        
                            if(prod_cats){
                                for(let i=0;i<prod_cats.length;i++){
                                    let keyName = i == 0 ? 'item_category' : `item_category${i+1}`
        
        
        
                                    if(i == 0) obj[keyName] = prod_cats[i]
                                    if(i != 0) obj[keyName] = prod_cats[i]
                                }
                            }
                            //totalValue+=parseFloat(price)
        
                            gTagData.items.push(obj)
                        }
                    }    
                    gtag("event", "remove_from_cart", gTagData)   
                }
            }





        if (value != min) {
            value = value - 1;
        } else {
            value = min;
        }

        $input.val(value);
    });

    $(document).on('click', '.increment', function() {
        let max = $(this)
        let $this = $(this),
            $input = $this.parent().find('input'),
            value = parseInt($input.val(), 10);
        $input.val(value + 1);


        
        if($(this).attr('data-from-cart')){
            if($(this).attr('data-product_type') == 'prod'){
                let product_id = $(this).attr('data-product_id');
                let product_count = 1
                let product_s = $(this).attr('data-product_s');
                let product_h = $(this).attr('data-product_h');
                let product_l = $(this).attr('data-product_l');
                let product_l1 = $(this).attr('data-product_l1');
                let product_l2 = $(this).attr('data-product_l2');
                let product_m = $(this).attr('data-product_m');
                let product_d = $(this).attr('data-product_d');
                let product_b1 = $(this).attr('data-product_b1');
                let product_b2 = $(this).attr('data-product_b2');
                let prod_cats = $(this).data('product_cats')
                let prod_type = $(this).data('prod_type');
                let final_price = $(this).data('price')
                let variation_value = $(this).data('variation_value');
                let product_name = $(this).data('name');
        
                let sizes = ''
                    switch(prod_type){
                        case 1:sizes = `${product_s}x${product_h}`
                        break;
                        case 2: {
                            if(product_h) sizes+=`${product_h}x`
                            if(product_s) sizes+=`${product_s}x`
                            if(product_d) sizes+=`${product_d}x`
                            if(product_m) sizes+=`${product_m}x`
                            if(product_l) sizes+=`${product_l}x`
                            if(product_l1) sizes+=`${product_l1}x`
                            if(product_l2) sizes+=`${product_l2}x`
                            if(product_b1) sizes+=`${product_b1}x`
                            if(product_b2) sizes+=`${product_b2}x`
        
                            sizes = sizes.split('')
                            sizes[sizes.length-1] = ""
                            sizes = sizes.join('')
                        }
                        break;
                        case 4:  sizes = variation_value
                        break;
                    }
        
                let gTagData = {
                    currency: "UAH",
                    value: parseFloat(product_count) * parseFloat(final_price),
                    items: [ 
                        {
                            item_id: product_id,
                            item_name: product_name,
                            item_variant: sizes,
                            google_business_vertical: "retail",
                            price: final_price,
                            quantity: product_count
                        }
                    ]
                }
        
                if(prod_cats){
                    for(let i=0;i<prod_cats.length;i++){
                        let keyName = i == 0 ? 'item_category' : `item_category${i+1}`
                        if(i == 0) gTagData.items[0][keyName] = prod_cats[i]
                        if(i != 0) gTagData.items[0][keyName] = prod_cats[i]
                    }
                }
                gtag("event", "add_to_cart", gTagData)
            } else {
                let gTagData = {
                    currency: "UAH",
                    value: $(this).closest('.prod_cheaper').attr('data-price'),
                    items: []
                }


                let product_s = $(this).attr('data-product_s');
                let product_h = $(this).attr('data-product_h');
                let product_l = $(this).attr('data-product_l');
                let product_l1 = $(this).attr('data-product_l1');
                let product_l2 = $(this).attr('data-product_l2');
                let product_m = $(this).attr('data-product_m');
                let product_d = $(this).attr('data-product_d');
                let product_b1 = $(this).attr('data-product_b1');
                let product_b2 = $(this).attr('data-product_b2');
                let prod_cats = $(this).data('product_cats')
                let prod_type = $(this).data('prod_type');


                let sizes = ''
                    switch(prod_type){
                        case 1:sizes = `${product_s}x${product_h}`
                        break;
                        case 2: {
                            if(product_h) sizes+=`${product_h}x`
                            if(product_s) sizes+=`${product_s}x`
                            if(product_d) sizes+=`${product_d}x`
                            if(product_m) sizes+=`${product_m}x`
                            if(product_l) sizes+=`${product_l}x`
                            if(product_l1) sizes+=`${product_l1}x`
                            if(product_l2) sizes+=`${product_l2}x`
                            if(product_b1) sizes+=`${product_b1}x`
                            if(product_b2) sizes+=`${product_b2}x`
        
                            sizes = sizes.split('')
                            sizes[sizes.length-1] = ""
                            sizes = sizes.join('')
                        }
                        break;
                        case 4:  sizes = variation_value
                        break;
                    }



                let firstElObj = {
                    item_id : $(this).attr('data-product_id'),
                    item_name : $(this).attr('data-name'),
                    price: $(this).attr('data-prod_price'),
                    google_business_vertical: "retail",
                    item_variant: sizes,
                    quantity: 1
                }

                gTagData.items.push(firstElObj)

                let together_cheaper = $(this).attr('data-together-cheaper')
                if(together_cheaper) together_cheaper = JSON.parse(together_cheaper)
                if(together_cheaper && together_cheaper.length){
                    //let totalValue = 0
                    for(let item of together_cheaper){
                        
                        let obj = {
                            item_id: item?.id,
                            google_business_vertical: "retail",
                            quantity: 1,

                        }

                        let price = item.promotional_price
                        let product_name =item.name
                        let product_s = $(`.together-cheaper-product-id-${item.id}`).attr('data-s');
                        let product_h = $(`.together-cheaper-product-id-${item.id}`).attr('data-h');
                        let product_l = $(`.together-cheaper-product-id-${item.id}`).attr('data-l');
                        let product_l1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l1');
                        let product_l2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l2');
                        let product_m = $(`.together-cheaper-product-id-${item.id}`).attr('data-m');
                        let product_d = $(`.together-cheaper-product-id-${item.id}`).attr('data-d');
                        let product_b1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b1');
                        let product_b2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b2');
                        let prod_cats =$(`.together-cheaper-product-id-${item.id}`).data('product_cats')
                        let prod_type = $(`.together-cheaper-product-id-${item.id}`).data('product_type');
                        let variation_value = $(`.together-cheaper-product-id-${item.id}`).data('variation_value');
    
                        let sizes = ''
                        switch(prod_type){
                            case 1:sizes = `${product_s}x${product_h}`
                            break;
                            case 2: {
                                if(product_h) sizes+=`${product_h}x`
                                if(product_s) sizes+=`${product_s}x`
                                if(product_d) sizes+=`${product_d}x`
                                if(product_m) sizes+=`${product_m}x`
                                if(product_l) sizes+=`${product_l}x`
                                if(product_l1) sizes+=`${product_l1}x`
                                if(product_l2) sizes+=`${product_l2}x`
                                if(product_b1) sizes+=`${product_b1}x`
                                if(product_b2) sizes+=`${product_b2}x`
    
                                sizes = sizes.split('')
                                sizes[sizes.length-1] = ""
                                sizes = sizes.join('')
                            }
                            break;
                            case 4:  sizes = variation_value
                            break;
                        }
    
                        obj.item_name = product_name
                        obj.item_variant = sizes
                        obj.price = price
    
                        if(prod_cats){
                            for(let i=0;i<prod_cats.length;i++){
                                let keyName = i == 0 ? 'item_category' : `item_category${i+1}`
    
    
    
                                if(i == 0) obj[keyName] = prod_cats[i]
                                if(i != 0) obj[keyName] = prod_cats[i]
                            }
                        }
                        //totalValue+=parseFloat(price)
    
                        gTagData.items.push(obj)
                    }
                }    
                gtag("event", "add_to_cart", gTagData)
            }
        }

    });
    /////////////

    $(document).on('keyup', 'input[name=part_pay]', function() {
        var _this = $(this);
        var min = parseInt(_this.attr('min')) || 3; // if min attribute is not defined, 1 is default
        var max = parseInt(_this.attr('max')) || 12; // if max attribute is not defined, 100 is default
        var val = parseInt(_this.val()) || (min - 1); // if input char is not a number the value will be (min - 1) so first condition will be true
        if (val < min)
            _this.val(min);
        if (val > max)
            _this.val(max);
    });

    //plus-minus in cabinet
    $(document).on('click', '.decrement-cabinet', function() {
        let $this = $(this),
            $input = $this.parent().find('input'),
            hasMin = $input[0].hasAttribute('data-min'),
            value = parseInt($input.val(), 10),
            min = hasMin ? +$input.attr('data-min') : 1;

        if (value != min) {
            value = value - 1;
        } else {
            value = min;
        }

        $input.val(value);
    });

    $(document).on('click', '.increment-cabinet', function() {
        let $this = $(this),
            $input = $this.parent().find('input'),
            hasMax = $input[0].hasAttribute('data-max'),
            value = parseInt($input.val(), 10),
            max = hasMax ? +$input.attr('data-max') : 1;
        if (value != max) {
            value = value + 1;
        } else {
            value = max;
        }
        $input.val(value);
    });
    /////////////


    let tempUser = readCookie('tempUser');
    if (!tempUser) {
        $.ajax({
            type: "post",
            url: "/client/getTempUserID",
            success: function(id) {
                createCookie('tempUser', id, 10)
            },
        })
    }




    _functions.addToCart = async function($$this, options) {
        let gTagData = {
            currency: "UAH",
            value: 0,
            items: []
        }
        let product_name = $($$this).data('product_name');

       
        let product_id = $($$this).data('product_id');
        let product_price;
        let product_s, product_h, product_l, product_l1, product_l2,product_b1,product_b2, product_m, product_d, variation_id, final_price
        let product_count = 1;
        let general_options = []
        let product_additional_options = options ? JSON.stringify(options) : [];
        let product_collection = [];
        let product_collection_length
        let tempUser = readCookie('tempUser');
        let jwt = readCookie('jwt');
        let product_type;
        let data;
        let add_chars
        // Cart product-collection btn 
        if ($($$this).hasClass('together-cheaper')) {
            product_price = $($$this).closest('.cheaper-total-wrap').find('#all-product_price .price').text();

            product_id = $('.first-el').attr('data-product_id');
            if (product_id) product_collection.push({ product_id: product_id });


            let product2_id = $('.second-el').attr('data-product_id');
            if (product2_id) product_collection.push({ product_id: product2_id });

            let product3_id = $('.cheaper-prod .swiper-slide-active').find('.js-product').attr('data-product_id');
            let isCheked = $('.dont_add_third_el').is(':checked')
            if (product3_id && !isCheked) product_collection.push({ product_id: product3_id });

            product_collection_length = product_collection.length
            product_type = 'together-prod';


            if(product_collection && product_collection.length){
                let totalValue = 0
                for(let item of product_collection){
                    item = item?.product_id
                    
                    let obj = {
                        item_id: item,
                        google_business_vertical: "retail",
                        quantity: 1
                    }

                    let price = $(`.together-cheaper-product-id-${item}`).attr('data-price');
                    if(!price) price = $(`.together-cheaper-product-id-${item}`).attr('data-total_price');
                    let product_name = $(`.together-cheaper-product-id-${item}`).attr('data-product_name');
                    let product_s = $(`.together-cheaper-product-id-${item}`).attr('data-s');
                    let product_h = $(`.together-cheaper-product-id-${item}`).attr('data-h');
                    let product_l = $(`.together-cheaper-product-id-${item}`).attr('data-l');
                    let product_l1 = $(`.together-cheaper-product-id-${item}`).attr('data-l1');
                    let product_l2 = $(`.together-cheaper-product-id-${item}`).attr('data-l2');
                    let product_m = $(`.together-cheaper-product-id-${item}`).attr('data-m');
                    let product_d = $(`.together-cheaper-product-id-${item}`).attr('data-d');
                    let product_b1 = $(`.together-cheaper-product-id-${item}`).attr('data-b1');
                    let product_b2 = $(`.together-cheaper-product-id-${item}`).attr('data-b2');
                    let prod_cats =$(`.together-cheaper-product-id-${item}`).data('product_cats')
                    let prod_type = $(`.together-cheaper-product-id-${item}`).data('product_type');
                    let variation_value = $(`.together-cheaper-product-id-${item}`).data('variation_value');

                    let sizes = ''
                    switch(prod_type){
                        case 1:sizes = `${product_s}x${product_h}`
                        break;
                        case 2: {
                            if(product_h) sizes+=`${product_h}x`
                            if(product_s) sizes+=`${product_s}x`
                            if(product_d) sizes+=`${product_d}x`
                            if(product_m) sizes+=`${product_m}x`
                            if(product_l) sizes+=`${product_l}x`
                            if(product_l1) sizes+=`${product_l1}x`
                            if(product_l2) sizes+=`${product_l2}x`
                            if(product_b1) sizes+=`${product_b1}x`
                            if(product_b2) sizes+=`${product_b2}x`

                            sizes = sizes.split('')
                            sizes[sizes.length-1] = ""
                            sizes = sizes.join('')
                        }
                        break;
                        case 4:  sizes = variation_value
                        break;
                    }

                    obj.item_name = product_name
                    obj.item_variant = sizes
                    obj.price = price

                    if(prod_cats){
                        for(let i=0;i<prod_cats.length;i++){
                            let keyName = i == 0 ? 'item_category' : `item_category${i+1}`



                            if(i == 0) obj[keyName] = prod_cats[i]
                            if(i != 0) obj[keyName] = prod_cats[i]
                        }
                    }
                    totalValue+=parseFloat(price)

                    gTagData.items.push(obj)
                }
                gTagData.value = totalValue
            }

            // COLLECTION IF HERE
        } else if ($($$this).hasClass('btn-primary-2 collection')) {
            // product_price = $($$this).closest('.product_detail').find('.product_price b').text();
            // product_count = $($$this).closest('.product_detail').find('.thumb-input-number input[name="product_count"]').val();
            // product_type = 'prod';
            // Cart btn 
        } else {
            add_chars = $($$this).attr('data-add_chars')
            product_type = 'prod';
            product_price = $('.price-div .price').html()
            if (!product_price) product_price = $($$this).attr('data-price');
            final_price = $('.product_block').attr('data-price')
            if (!final_price) final_price = $($$this).attr('data-price');
            product_count = $('.prod_quantity input').val()
            if (!product_count) product_count = 1;
            product_s = $($$this).attr('data-s');
            product_h = $($$this).attr('data-h');
            product_l = $($$this).attr('data-l');
            product_l1 = $($$this).attr('data-l1');
            product_l2 = $($$this).attr('data-l2');
            product_m = $($$this).attr('data-m');
            product_d = $($$this).attr('data-d');
            product_b1 = $($$this).attr('data-b1');
            product_b2 = $($$this).attr('data-b2');
            variation_id = $($$this).attr('data-variation_id')

            let prod_cats = $($$this).data('product_cats')
            let prod_type = $($$this).data('product_type');
            let variation_value = $($$this).data('variation_value');

            let sizes = ''
                switch(prod_type){
                    case 1:sizes = `${product_s}x${product_h}`
                    break;
                    case 2: {
                        if(product_h) sizes+=`${product_h}x`
                        if(product_s) sizes+=`${product_s}x`
                        if(product_d) sizes+=`${product_d}x`
                        if(product_m) sizes+=`${product_m}x`
                        if(product_l) sizes+=`${product_l}x`
                        if(product_l1) sizes+=`${product_l1}x`
                        if(product_l2) sizes+=`${product_l2}x`
                        if(product_b1) sizes+=`${product_b1}x`
                        if(product_b2) sizes+=`${product_b2}x`

                        sizes = sizes.split('')
                        sizes[sizes.length-1] = ""
                        sizes = sizes.join('')
                    }
                    break;
                    case 4:  sizes = variation_value
                    break;
                }

            gTagData = {
                currency: "UAH",
                value: parseFloat(product_count) * parseFloat(final_price),
                items: [ 
                    {
                        item_id: product_id,
                        item_name: product_name,
                        item_variant: sizes,
                        google_business_vertical: "retail",
                        price: final_price,
                        quantity: product_count
                    }
                ]
            }

            if(prod_cats){
                for(let i=0;i<prod_cats.length;i++){
                    let keyName = i == 0 ? 'item_category' : `item_category${i+1}`



                    if(i == 0) gTagData.items[0][keyName] = prod_cats[i]
                    if(i != 0) gTagData.items[0][keyName] = prod_cats[i]
                }
            }

            $('.general-options').each(function() {
                let title
                let text
                let index
                if ($(this).find('.select-title').html()) {
                    title = $(this).find('.select-title').html().trim()
                    text = $(this).find('.SelectBox option:selected').html().trim()
                    index = $(this).find('.SelectBox option:selected').index()
                } else if ($(this).find('.product_info-item-title')) {
                    title = $(this).find('.product_info-item-title').html().trim()
                    text = $(this).find('.product_info-item-value').html().trim()
                }
                if (typeof index != 'undefined') general_options.push({ title, text, index })
                if (typeof index == 'undefined') general_options.push({ title, text })
            })

        }
        product_price = product_price ? Number(product_price) : 0;

        data = {
            tempUser,
            product_type,
            product_id: product_id,
            // total_price: product_price,
            product_collection: product_collection,
            quantity: product_count,
            product_s,
            product_h,
            product_l,
            product_l1,
            product_l2,
            product_m,
            product_d,
            variation_id,
            // final_price,
            general_options: general_options && general_options.length ? JSON.stringify(general_options) : '[]',
            product_additional_options,
            product_collection_length,
            product_b1, 
            product_b2,
            add_chars
        }

        let count = $('.header-cart').find('i').text();
        if (!count) {
            let text
            switch (lang) {
                case 'uk':
                    text = 'грн'
                    break;
                case 'ru':
                    text = 'грн'
                    break;
                case 'en':
                    text = 'UAH'
                    break;
                default:
                    break;
            }
            $('.header-cart').removeClass('open-info');
            $('.header-cart').addClass('open-cart');
            $('.header-cart').find('.tooltip').remove();
            $('.header-cart .cart-icon').append(`<i>${product_count}</i> `);
            $('.header-cart').append(`<p class="cart_total_price_p"><b class="cart_total_price">${product_price}</b>${text}</p>`)
            $('#cart-popup-out').find('.cart-empty-message').hide();
        } else {
            let total_price = $('.header-cart').find('.cart_total_price').text();
            $('.header-cart').find('i').text(Number(count) + Number(product_count))
            $('.cart_total_price').text(Number(total_price) + Number(product_price))
        }

        const $this = $($$this);

        if (!$this.hasClass('loading')) {
            $this.addClass('loading');

            $('.js-product').not($($$this).closest('.js-product')).each(function() {
                $($$this).find('.order-btn').addClass('disabled');
            });
            
            let loader = '<span class="btn-loader"><span class="btn-loader-inner"><span></span><span></span><span></span></span></span>',
                success = '<span class="btn-loader-complete"></span>';
        
            return new Promise((resolve, reject) => {
                $this.append(loader).find('.btn-loader').fadeIn(500, function() {
                    if (tempUser || jwt) {
                        $.ajax({
                            type: "post",
                            data: data,
                            url: lang == 'uk' ? `/addCart` : `/${lang}/addCart`,
                            success: function(data) {
                                gtag("event", "add_to_cart", gTagData)
                                $.ajax({
                                    type: "get",
                                    url: lang == 'uk' ? '/booking/getCurrentCart' : `/${lang}/booking/getCurrentCart`,
                                    dataType: 'JSON',
                                    success: function(data) {
                                        $('.cart').html(data.html)
                                        $('.header-cart').addClass('open-cart')
                                    },
                                    error: function(data) {}
                                })
                                resolve(data);
                            },
                            error: function(error) {
                                reject(error);
                            }
                        }).done(function() {
                            setTimeout(function() {
                                $this.append(success).fadeIn(500, function() {
                                    cleanupUI($this);
                                });
                            }, 1000);
                        })
                    } else {
                        setTimeout(function() {
                            $this.append(success).fadeIn(500, function() {
                                cleanupUI($this);
                            });
                        }, 1000);
                    }
                });
            });
            
            
            function cleanupUI($element) {
                $element.find('.btn-loader').remove();
                setTimeout(function() {
                    $element.find('.btn-loader-complete').fadeOut(500, function() {
                        $(this).remove();
                        $element.removeClass('loading');
                        $('.js-product').each(function() {
                            $(this).find('.order-btn').removeClass('disabled');
                        });
                    });
                }, 1000);
            }
        }


        //informer
        let nameProduct = $(this).parents('.js-product-detail').find('.product_detail-title').html();
        setTimeout(function() {
            $('.cart-informer').addClass('active');
            $('.cart-informer').find('.title b').html(nameProduct);
        }, 300);
        setTimeout(function() {
            $('.cart-informer').removeClass('active');
            $this.removeClass('loading');
        }, 2000);
    }
    _functions.checkOrUpdateCart = async function($$this, options,updateData) {
        let product_id = $($$this).data('product_id');
        let product_price;
        let product_s, product_h, product_l, product_l1, product_l2,product_b1,product_b2, product_m, product_d, variation_id, final_price
        let product_count = 1;
        let general_options = []
        let product_additional_options = options ? JSON.stringify(options) : [];
        let product_collection = [];
        let product_collection_length
        let tempUser = readCookie('tempUser');
        let product_type;
        let data;
        let  add_chars = $($$this).attr('data-add_chars')

        product_type = 'prod';
        product_price = $('.price-div .price').html()
        if (!product_price) product_price = $($$this).attr('data-price');
        final_price = $('.product_block').attr('data-price')
        if (!final_price) final_price = $($$this).attr('data-price');
        product_count = $('.prod_quantity input').val()
        if (!product_count) product_count = 1;
        product_s = $($$this).attr('data-s');
        product_h = $($$this).attr('data-h');
        product_l = $($$this).attr('data-l');
        product_l1 = $($$this).attr('data-l1');
        product_l2 = $($$this).attr('data-l2');
        product_m = $($$this).attr('data-m');
        product_d = $($$this).attr('data-d');
        product_b1 = $($$this).attr('data-b1');
        product_b2 = $($$this).attr('data-b2');
        variation_id = $($$this).attr('data-variation_id')

        $('.general-options').each(function() {
            let title
            let text
            let index
            if ($(this).find('.select-title').html()) {
                title = $(this).find('.select-title').html().trim()
                text = $(this).find('.SelectBox option:selected').html().trim()
                index = $(this).find('.SelectBox option:selected').index()
            } else if ($(this).find('.product_info-item-title')) {
                title = $(this).find('.product_info-item-title').html().trim()
                text = $(this).find('.product_info-item-value').html().trim()
            }
            if (typeof index != 'undefined') general_options.push({ title, text, index })
            if (typeof index == 'undefined') general_options.push({ title, text })
        })

        

        data = {
            tempUser,
            product_type,
            product_id: product_id,
            product_collection: product_collection,
            quantity: product_count,
            product_s,
            product_h,
            product_l,
            product_l1,
            product_l2,
            product_m,
            product_d,
            variation_id,
            general_options: general_options && general_options.length ? JSON.stringify(general_options) : '[]',
            product_additional_options,
            product_collection_length,
            product_b1, 
            product_b2,
            updateData,
            add_chars
        }
        let result = null


        async function makeAjaxRequest(data) {
            try {
                const response =  await $.ajax({
                    type: "post",
                    data: data,
                    url: `/checkOrUpdateCart`
                }) 
                return response
            } catch (error) {
              // Handle any errors that occurred during the request
              console.error(error);
            }
        }
          
        result = await makeAjaxRequest(data)



        
        return result
   
    }
    _functions.calculateSinglePrice = function($parentEl) {
        let prod = $parentEl,
            productSum = +prod.attr('data-price') * +prod.find('input').val();
        prod.find('.price').text(productSum);
    }

    $(document).on('click', '.cart_items .js-product .thumb-input-number button', function() {
        let product_id = $(this).attr('data-product_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');
        let product_type = $(this).attr('data-product_type');
        let product_count = $(this).closest('.js-product').find('input').val();
        let product_s = $(this).attr('data-product_s');
        let product_h = $(this).attr('data-product_h');
        let product_l = $(this).attr('data-product_l');
        let product_l1 = $(this).attr('data-product_l1');
        let product_l2 = $(this).attr('data-product_l2');
        let product_m = $(this).attr('data-product_m');
        let product_d = $(this).attr('data-product_d');
        let product_b1 = $(this).attr('data-product_b1');
        let product_b2 = $(this).attr('data-product_b2');
        let product_additional_options = $(this).attr('data-additional_options');
        let general_options = $(this).attr('data-general_options');
        let variation_id = $(this).attr('data-variation_id');
        let add_chars = $(this).attr('data-add_chars')
        let data = { tempUser, product_type, product_id: product_id, quantity: product_count, product_s, product_h, product_l, product_l1, product_l2, product_m, product_d, product_additional_options, variation_id, general_options, is_update: true,product_b1,product_b2,add_chars }

        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: data,
                    url: lang == 'uk' ? `/addCart` : `/${lang}/addCart`,
                    success: function(data) {
                        $.ajax({
                            type: "get",
                            url: lang == 'uk' ? '/booking/getCurrentCart' : `/${lang}/booking/getCurrentCart`,
                            dataType: 'JSON',
                            success: function(data) {
                                $('.cart').html(data.html)
                                    //_functions.calculateCartTotalPrice()
                            },
                            error: function(data) {}
                        })
                        _functions.calculateSinglePrice($(this).closest('.js-product'));
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        }
    });
    $(document).on('click', '.cart_items .js-complect .thumb-input-number button', function() {
        let product_id = $(this).attr('data-product_id');
        //let total_price = $(this).attr('data-price');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');
        let product_type = $(this).attr('data-product_type');
        let product_count = $(this).closest('.js-complect').find('input').val();
        let product_collection = $(this).attr('data-product_collection_original')
        let product_collection_length = $(this).closest('.js-complect').find('.prod_cheaper-item').length

        let data = { tempUser, product_type, product_id: product_id, quantity: product_count, product_collection_length,product_collection, is_update: true }

        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: data,
                    url: lang == 'uk' ? `/addCart` : `/${lang}/addCart`,
                    success: function(data) {
                        $.ajax({
                            type: "get",
                            url: lang == 'uk' ? '/booking/getCurrentCart' : `/${lang}/booking/getCurrentCart`,
                            dataType: 'JSON',
                            success: function(data) {
                                $('.cart').html(data.html)
                                    //_functions.calculateCartTotalPrice()
                            },
                            error: function(data) {}
                        })
                        _functions.calculateSinglePrice($(this).closest('.js-complect'));
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        }
    });





    //remove product from card
    $(document).on('click', '.cart .js-product .btn-close', function() {
        let cart_id = $(this).attr('data-cart_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');
        let product_count = $(this).closest('.js-product').find('input').val();
        let product_id = $(this).attr('data-product_id');
        let prod_cats = $(this).data('product_cats')
        let final_price = $(this).data('price')
        let prod_type = $(this).data('prod_type');
        let variation_value = $(this).data('variation_value');
        let product_name = $(this).data('name');

        let product_s = $(this).attr('data-product_s');
        let product_h = $(this).attr('data-product_h');
        let product_l = $(this).attr('data-product_l');
        let product_l1 = $(this).attr('data-product_l1');
        let product_l2 = $(this).attr('data-product_l2');
        let product_m = $(this).attr('data-product_m');
        let product_d = $(this).attr('data-product_d');
        let product_b1 = $(this).attr('data-product_b1');
        let product_b2 = $(this).attr('data-product_b2');


        let sizes = ''
            switch(prod_type){
                case 1:sizes = `${product_s}x${product_h}`
                break;
                case 2: {
                    if(product_h) sizes+=`${product_h}x`
                    if(product_s) sizes+=`${product_s}x`
                    if(product_d) sizes+=`${product_d}x`
                    if(product_m) sizes+=`${product_m}x`
                    if(product_l) sizes+=`${product_l}x`
                    if(product_l1) sizes+=`${product_l1}x`
                    if(product_l2) sizes+=`${product_l2}x`
                    if(product_b1) sizes+=`${product_b1}x`
                    if(product_b2) sizes+=`${product_b2}x`

                    sizes = sizes.split('')
                    sizes[sizes.length-1] = ""
                    sizes = sizes.join('')
                }
                break;
                case 4:  sizes = variation_value
                break;
            }

        let gTagData = {
            currency: "UAH",
            value: parseFloat(product_count) * parseFloat(final_price),
            items: [ 
                {
                    item_id: product_id,
                    item_name: product_name,
                    item_variant: sizes,
                    google_business_vertical: "retail",
                    price: final_price,
                    quantity: product_count
                }
            ]
        }

        if(prod_cats){
            for(let i=0;i<prod_cats.length;i++){
                let keyName = i == 0 ? 'item_category' : `item_category${i+1}`



                if(i == 0) gTagData.items[0][keyName] = prod_cats[i]
                if(i != 0) gTagData.items[0][keyName] = prod_cats[i]
            }
        }

        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: {cart_id: cart_id},
                    url: lang == 'uk' ? `/deleteCart` : `/${lang}/deleteCart`,
                    success: function(data) {
                        gtag("event", "remove_from_cart", gTagData)
                        $.ajax({
                            type: "get",
                            url: lang == 'uk' ? '/booking/getCurrentCart' : `/${lang}/booking/getCurrentCart`,
                            dataType: 'JSON',
                            success: function(data) {
                                $('.cart').html(data.html)
                                _functions.calculateCartTotalPrice()
                            },
                            error: function(data) {}
                        })
                        $(this).closest('.js-product').slideUp(0, function() {
                            $(this).remove();
                            _functions.calculateCartTotalPrice();
                        });
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        } else {
            $(this).closest('.js-product').slideUp(0, function() {
                $(this).remove();
                _functions.calculateCartTotalPrice();
            });
        }
    });

    //remove complect product from card
    $(document).on('click', '.cart .js-complect .btn-close', function() {
        let cart_id = $(this).attr('data-cart_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');

        let gTagData = {
            currency: "UAH",
            value: $(this).closest('.prod_cheaper').attr('data-price'),
            items: []
        }


        let product_s = $(this).attr('data-product_s');
        let product_h = $(this).attr('data-product_h');
        let product_l = $(this).attr('data-product_l');
        let product_l1 = $(this).attr('data-product_l1');
        let product_l2 = $(this).attr('data-product_l2');
        let product_m = $(this).attr('data-product_m');
        let product_d = $(this).attr('data-product_d');
        let product_b1 = $(this).attr('data-product_b1');
        let product_b2 = $(this).attr('data-product_b2');
        let prod_cats = $(this).data('product_cats')
        let prod_type = $(this).data('prod_type');


        let sizes = ''
            switch(prod_type){
                case 1:sizes = `${product_s}x${product_h}`
                break;
                case 2: {
                    if(product_h) sizes+=`${product_h}x`
                    if(product_s) sizes+=`${product_s}x`
                    if(product_d) sizes+=`${product_d}x`
                    if(product_m) sizes+=`${product_m}x`
                    if(product_l) sizes+=`${product_l}x`
                    if(product_l1) sizes+=`${product_l1}x`
                    if(product_l2) sizes+=`${product_l2}x`
                    if(product_b1) sizes+=`${product_b1}x`
                    if(product_b2) sizes+=`${product_b2}x`

                    sizes = sizes.split('')
                    sizes[sizes.length-1] = ""
                    sizes = sizes.join('')
                }
                break;
                case 4:  sizes = variation_value
                break;
            }



        let firstElObj = {
            item_id : $(this).attr('data-product_id'),
            item_name : $(this).attr('data-name'),
            price: $(this).attr('data-prod_price'),
            google_business_vertical: "retail",
            item_variant: sizes,
            quantity: 1
        }

        gTagData.items.push(firstElObj)

        let together_cheaper = $(this).attr('data-together-cheaper')
        if(together_cheaper) together_cheaper = JSON.parse(together_cheaper)
        if(together_cheaper && together_cheaper.length){
            //let totalValue = 0
            for(let item of together_cheaper){
                
                let obj = {
                    item_id: item?.id,
                    google_business_vertical: "retail",
                    quantity: 1,

                }

                let price = item.promotional_price
                let product_name =item.name
                let product_s = $(`.together-cheaper-product-id-${item.id}`).attr('data-s');
                let product_h = $(`.together-cheaper-product-id-${item.id}`).attr('data-h');
                let product_l = $(`.together-cheaper-product-id-${item.id}`).attr('data-l');
                let product_l1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l1');
                let product_l2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l2');
                let product_m = $(`.together-cheaper-product-id-${item.id}`).attr('data-m');
                let product_d = $(`.together-cheaper-product-id-${item.id}`).attr('data-d');
                let product_b1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b1');
                let product_b2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b2');
                let prod_cats =$(`.together-cheaper-product-id-${item.id}`).data('product_cats')
                let prod_type = $(`.together-cheaper-product-id-${item.id}`).data('product_type');
                let variation_value = $(`.together-cheaper-product-id-${item.id}`).data('variation_value');

                let sizes = ''
                switch(prod_type){
                    case 1:sizes = `${product_s}x${product_h}`
                    break;
                    case 2: {
                        if(product_h) sizes+=`${product_h}x`
                        if(product_s) sizes+=`${product_s}x`
                        if(product_d) sizes+=`${product_d}x`
                        if(product_m) sizes+=`${product_m}x`
                        if(product_l) sizes+=`${product_l}x`
                        if(product_l1) sizes+=`${product_l1}x`
                        if(product_l2) sizes+=`${product_l2}x`
                        if(product_b1) sizes+=`${product_b1}x`
                        if(product_b2) sizes+=`${product_b2}x`

                        sizes = sizes.split('')
                        sizes[sizes.length-1] = ""
                        sizes = sizes.join('')
                    }
                    break;
                    case 4:  sizes = variation_value
                    break;
                }

                obj.item_name = product_name
                obj.item_variant = sizes
                obj.price = price

                if(prod_cats){
                    for(let i=0;i<prod_cats.length;i++){
                        let keyName = i == 0 ? 'item_category' : `item_category${i+1}`



                        if(i == 0) obj[keyName] = prod_cats[i]
                        if(i != 0) obj[keyName] = prod_cats[i]
                    }
                }
                //totalValue+=parseFloat(price)

                gTagData.items.push(obj)
            }
        }    
        gtag("event", "remove_from_cart", gTagData)
        
        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: {cart_id: cart_id},
                    url: lang == 'uk' ? `/deleteCart` : `/${lang}/deleteCart`,
                    success: function(data) {
                        $.ajax({
                            type: "get",
                            url: lang == 'uk' ? '/booking/getCurrentCart' : `/${lang}/booking/getCurrentCart`,
                            dataType: 'JSON',
                            success: function(data) {
                                $('.cart').html(data.html)
                                _functions.calculateCartTotalPrice()
                            },
                            error: function(data) {}
                        })
                        $(this).closest('.js-complect').slideUp(0, function() {
                            $(this).remove();
                            _functions.calculateCartTotalPrice();
                        })
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        } else {
            $(this).closest('.js-complect').slideUp(0, function() {
                $(this).remove();
                _functions.calculateCartTotalPrice();
            })
        }
    });


    // calc total sum in cart
    _functions.calculateCartTotalPrice = function() {
        let total = 0;
        let quantity = 0;
        $('.cart .js-item').each(function() {
            total += +$(this).data('price') * +$(this).find('.thumb-input-number input').val();
            quantity += (+$(this).find('.thumb-input-number input').val());
        });
        $('#card-total-price').html(total);
        $('header .header-cart b').html(total);
        $('.header-cart').find('i').text(quantity)
        $('.prod-sum').html(quantity);
        if (total === 0) {
            $('#cart-submit').addClass('disabled');
            $('.cart-empty-message').show()
            let text1
            let text2
            switch (lang) {
                case 'uk':
                    text1 = "Ваш кошик порожній",
                        text2 = "Наповніть його товарами"
                    break;
                case 'ru':
                    text1 = "Ваша корзина пуста",
                        text2 = "Наповните его товарами"
                    break;
                case 'en':
                    text1 = "Your basket is empty",
                        text2 = "Fill it with products"
                    break;
                default:
                    break;
            }
            $('.header-cart').find('i').remove();
            $('.header-cart').find('.cart_total_price_p').remove();
            $('.header-cart').append(
                `<div class="tooltip">
                <div class="h6">
                    ${text1}
                </div>
                <div class="text">
                    ${text2}
                </div>
            </div>`
            );
            $('.header-cart').removeClass('open-cart')
        }
    }






    $('.together-cheaper').on('click', function() {
        _functions.addToCart(this)
    });

    $(document).on("click", ".order-btn", async function() {
        if($(this).hasClass('prod-detail-btn')){
            let options;
            if ($(this).attr('data', 'is_config')) {
                options = _functions.getProductOptions();
            }
            if ($(this).attr('data-color')) {
                let arr = []
                options = JSON.parse($(this).attr('data-color'))
                if(options) arr.push(options)
                options = arr
            }
            _functions.addToCart(this, options)
        } else {
            let atrNames = ['thickness','facet','main_lighting','backlight','heating','lens',
            'lens-type', 'lens-sub-type','clock','clock_value','audio','audio_value','shelf', 'accessories', 'set_accessories','towel_rail', 'tempering_glass',
            'tempering_glass_value', 'shower_shelf','mounting_system','entrance_part','door_hinges', 'door_handles','opening_door','handle_type','handle_type_value',
            'special_installation','placement_partition','upper_corner','type_sealant','glass_holder','shelf_type','shelf_type_value','switch-type-1',
            'switch-8', 'switch-9', 'switch-10', 'switch-95', 'switch-96', 'switch-97','switch-98','switch-99','switch-100','switch-101','switch-102','switch-103', 'lens-type-detail','color','protect_glass'];
            let data={};
            data.default_atr = _functions.getProductOptions();
            data.id = $('#config-order').attr('data-product_id');
            data.s = $('#config-order').attr('data-s');
            data.h = $('#config-order').attr('data-h');
            data.l = $('#config-order').attr('data-l');
            data.l1 = $('#config-order').attr('data-l1');
            data.l2 = $('#config-order').attr('data-l2');
            data.m = $('#config-order').attr('data-m');
            data.d = $('#config-order').attr('data-d');
            data.b1 = $('#config-order').attr('data-b1');
            data.b2 = $('#config-order').attr('data-b2');

            let add_chars = []
            if($('.change-add-chars').length){
                $('.change-add-chars').each((index,el) => {
                    let obj = {
                        id: $(el).attr("data-char_id"),
                        value: $(el).val()
                    }
                    add_chars.push(obj)
                })
            }
            if(add_chars && add_chars.length) data.add_chars = add_chars

            let compositeData = {};
            let mainImgPath = $('#main-img').attr('data-main-img-path');
            if(mainImgPath) compositeData.mainImg = 'public'+mainImgPath;
            let arr = [];
            $("input[type=radio]:checked").each(function(){
                let originAtrId = $(this).attr('data-origin-atr-id');
                let ifParentChecked = null
                let getParentBlock = $('.config-group').find(`.toggle-block-control[data-origin-atr-id='${originAtrId}']`)
                if(!getParentBlock.length){
                    ifParentChecked = true
                } else {
                    ifParentChecked = getParentBlock.is(':checked')
                }
                let atrName = $(this).attr('name');
                let noChangeImg = $(this).attr('data-noChangeImg')
                let imgPath = $(this).attr('data-img-config-path');
                if(atrName && !noChangeImg && ifParentChecked){
                    if(atrNames.includes(atrName) && imgPath ){
                        arr.push('public'+imgPath)
                    }
                }
            });
            $("input[type=checkbox]:checked").each(function(){
                    let atrName = $(this).attr('name');
                    let noChangeImg = $(this).attr('data-noChangeImg')
                    let imgPath = $(this).attr('data-img-config-path');
                    if(atrName && !noChangeImg){
                        if(atrNames.includes(atrName) && imgPath){
                            arr.push('public'+imgPath)
                        }
                    }
            });
            compositeData.compositeArr = arr;
            data.compositeData = compositeData
            let queryData = jQuery.param(data)

            let options = _functions.getProductOptions();
            let element = this
            if($(this).hasClass('schema')){
                let checkCart = await _functions.checkOrUpdateCart(this,options,null)
                await _functions.addToCart(this, options)
                if(!checkCart){
                    let link = '/create_rewiew_pdf' + "?" + queryData
                    $.ajax({
                        type: "get",
                        url: link,
                        dataType: 'JSON',
                        success: async function(data) {
                            let pdf_id = data
                            await _functions.checkOrUpdateCart(element,options,{schema_pdf_id: pdf_id})
                        },
                        error: function(data) {}
                    })
                } 
                $.ajax({
                    type: "get",
                    url: lang == 'uk' ? `/client/openShowerSchemaPopup?${queryData}` : `${lang}/client/openShowerSchemaPopup?${queryData}`,
                    dataType: 'JSON',
                    success: async function(data) {
                        let html = data.html
                        $(".shower-schema-popup .shower-schema-content").html(html)
                        _functions.openPopup(`.popup-content[data-rel="shower-schema-popup"]`);
                    }
                })
            } else {
                await _functions.addToCart(this, options)
            }
        }
    })


    //inputmask
    if ($(".inputmask").length) {
        $(".inputmask").inputmask({
            showMaskOnHover: false,
            definitions: {
                'x': {
                    validator: "[1-9]"
                },
                '9': {
                    validator: "[0-9]"
                }
            }
        });
    }
    if ($(".inputmask-promo").length) {
        $(".inputmask-promo").inputmask({
            showMaskOnHover: false,
            casing: "upper",
        });

    }

    $(document).on('click', '.input-btn', function() {
        if ($(this).siblings(".inputmask-promo").inputmask("isComplete")) {
            $(this).parent().removeClass('invalid').addClass('isComplete');
        } else {
            $(this).parent().addClass('invalid').removeClass('isComplete');
        }
    });
    $(document).on('click', '.input-close', function() {
        $(this).parent().find(".inputmask-promo").val("");
        $(this).parent().removeClass('isComplete');
    });



    $(document).on('click', '.cart .js-product .thumb-input-number button', function() {
        _functions.calculateCartTotalPrice();
    });
    $(document).on('click', '.cart .js-item .thumb-input-number button', function() {
        _functions.calculateCartTotalPrice();
    });

    //remove product from card
    $(document).on('click', '.cart .js-product .btn-close', function() {
        $(this).closest('.js-product').slideUp(0, function() {
            $(this).remove();
            _functions.calculateCartTotalPrice();
            _functions.calculateCartHeight();
        })
    });

    // check if cart more elements
    _functions.calculateCartHeight = function() {
        let cartHeightInner = parseInt($('.cart .cart_items').outerHeight()),
            cartHeightInnerReal = 0

        $('.cart_items').find('.js-product').each(function() {
            cartHeightInnerReal += parseInt($(this).outerHeight())
        });

        if (cartHeightInnerReal >= cartHeightInner) {
            $('.cart').addClass('overflow-product')
        } else {
            $('.cart').removeClass('overflow-product')
        }
    }
    _functions.calculateCartHeight();


    // open - close cart
    $(document).on('click', '.open-cart', function() {
        $.ajax({
            type: "get",
            url: lang == "uk" ? '/booking/getCurrentCart'  : `/${lang}/booking/getCurrentCart` ,
            dataType: 'JSON',
            success: function(data) {
                $('.cart').html(data.html)
                $('.cart').addClass('active');
                _functions.removeScroll();
                $('.sidebar').removeClass('active');
                $('.sidebar-btn').removeClass('active');
                $('html').removeClass('overflow-sidebar');
                _functions.calculateCartTotalPrice()
            },
            error: function(data) {}
        })

    });

    $(document).on('click', '.cart-close, .cart_bg-layer', function() {
        $('.cart').removeClass('active');
        _functions.addScroll();
    });









    // remove from favorites
    $('.js-product .remove.btn-close').on('click', function() {
        $(this).closest('.js-product').parent().remove();
    });



    // checkout tabs
    $(document).on('change', '.toggle-block-control', function() {
        let blockNum = $(this).data('block'),
            rel = $(this).data('rel'),
            $showBlock = $('.toggle-block[data-block="' + blockNum + '"][data-rel="' + rel + '"]'),
            $hideBlock = $('.toggle-block[data-block="' + blockNum + '"]:visible');

        // const showBlockSelect = $showBlock.find('.dropdown-item').not('.dropdown-item-child');

        if ($(this).is('input[type="checkbox"]')) {
            $showBlock.slideToggle(150);
            $showBlock.find('.input-field-wrapper').each(function() {
                let widthInput = parseInt($(this).find('.input-placeholder').width());
                $(this).css('--placeholder-width', widthInput + 'px')
            });
            return;
        }

        if ($hideBlock.length) {

            $hideBlock.slideUp(150, function() {
                $showBlock.slideDown(150, function() {

                  // Check all first of name
                  const radioInShowBlock = $showBlock.find('input[type="radio"]');
                  const inputNames = [];
                
                  radioInShowBlock.each(function () {
                    let inputName = $(this).attr('name');
      
                    if (!inputNames.includes(inputName)) {
                      inputNames.push(inputName);
                    }
                  });
  
                  for (let i = 0; i < inputNames.length; i++) {
                    let hasChildChecked = false;

                    $showBlock.find(`input[name="${inputNames[i]}"]`).each(function () {
                      if ( $(this)[0].hasAttribute('checked') ) {
                        hasChildChecked = true;
                        $(this).prop('checked', true);
                        // console.log('has')
                      }
                    });


                    if ( hasChildChecked == false ) {
                      $showBlock.find(`input[name="${inputNames[i]}"]`).each(function (index) {
                        if (index == 0 ) {
                          $(this).prop('checked', true);
                        }
                        // console.log('first')
                      });
                    }
                  }
                });

                $showBlock.find('.input-field-wrapper').each(function() {
                    let widthInput = parseInt($(this).find('.input-placeholder').width());
                    $(this).css('--placeholder-width', widthInput + 'px')
                });

                // uncheck all
                const radioInHideBlock = $hideBlock.find('input[type="radio"]');
                radioInHideBlock.each(function () {
                  if ($(this).is(':checked')) {
                    $(this).prop('checked', false);
                  }
                });
            });
        } else {

          $showBlock.slideDown(150, function() {

            // Check all first of name
            const radioInShowBlock = $showBlock.find('input[type="radio"]');
            const inputNames = [];
          
            radioInShowBlock.each(function () {
              let inputName = $(this).attr('name');

              if (!inputNames.includes(inputName)) {
                inputNames.push(inputName);
              }
            });

            for (let i = 0; i < inputNames.length; i++) {
              let hasChildChecked = false;

              $showBlock.find(`input[name="${inputNames[i]}"]`).each(function () {
                if ( $(this)[0].hasAttribute('checked') ) {
                  hasChildChecked = true;
                  $(this).prop('checked', true);
                  // console.log('has')
                }
              });


              if ( hasChildChecked == false ) {
                $showBlock.find(`input[name="${inputNames[i]}"]`).each(function (index) {
                  if (index == 0 ) {
                    $(this).prop('checked', true);
                  }
                  // console.log('first')
                });
              }
            }
          });
        }

        // _functions.chengeProductOptions();
    });
    

    $('.dropdown-item-parent').each(function() {
        let parentSelect = $(this);

        parentSelect.on('change', function() {
            let th = $(this),
                thOption = th.find('option:selected'),
                thOptionAttr = thOption.attr('some-attr'),
                thChildSelects = th.closest('.row').find('.dropdown-item-child select');
            
            thChildSelects.each(function() {
                let child = $(this),
                    childttr = child.attr('some-attr');

                thOptionAttr === childttr ? child.closest(".dropdown-child-wrapper").addClass('show') : child.closest(".dropdown-child-wrapper").removeClass('show');
            });
        });
    });




    function checkPromocode() {
        let user_id = $('#promocode').attr('data-user_id');
        let total_price = $('.all-product-price-el').html();
        total_price = total_price ? Number(total_price) : 0;
        let promocode_title = $('.promocode-input').val();
        if (promocode_title) {
            $('#promocode').attr('disabled', true);
            $.ajax({
                    context: this,
                    type: "post",
                    data: {
                        total_price,
                        promocode_title,
                        user_id
                    },
                    url: '/check_promocode',
                    success: function(data) {
                        if (data.discount) {
                            $('#all-products-discount').html(data.discount);
                            $('#all-products-discount').attr("data-discount", data.discount);
    
                            $('.final_price').html(data.new_price)
                            $('.final_price').html(+$('.final_price').html()+ checkCurrentDeliveryPrice())
                            $('.price-summ').show()
                            $('.promocode-input').attr('data-promocode_title', data.promocode_title);
                            $('.price-discount').show()
                                //_functions.calculateTotalCheckoutPrice();
                            $('#promocode').hide();
                            $('#promocode').attr('disabled', false);
                        } else if (data.response) {
                            $('#promocode').attr('disabled', false);
                            $('#promocode').closest('.input-button-wrapper').find('.text-md').text(data.response);
                        }

                    },
                    error: function(data) {
                        $('#promocode').attr('disabled', false);
                        if (data && data.responseJSON && data.responseJSON.message) $('.promocode-error').html(data.responseJSON.message)
                        $('.input-button-wrap.promocode').addClass('invalid')
                    }
                }).done(function() {

                })
                .fail(function() {

                });
        }

    }




    $(document).on('click', '#promocode', function() {
        checkPromocode()
    });


    $(document).on('click', '.diactivate-promo', function() {
        $('.price-summ').hide()
        $('.error-msg.promocode-error').html('')
        $('.promocode-input-wrapper-block').removeClass('invalid')
        $('.price-discount').hide()
        $('.promocode-input').removeAttr('data-promocode_title')
        $('#all-products-discount').html(0)
        $('#all-products-discount').removeAttr('data-discount')
        $('.final_price').html(+$('#summa').html()+checkCurrentDeliveryPrice())
        $('#promocode').show()
        //_functions.calculateTotalCheckoutPrice();
    })

    function checkCurrentDeliveryPrice() {
        let result
        $("input[name=delivery]").each(function() {
            if ($(this).is(':checked')) {
                result = +$(this).attr('data-default_price')
            }
        });
        return +result
    }


    // checkout calculate
    _functions.calculateTotalCheckoutPrice = function() {
        let allSummProduct = 0;
        let quantity = 0;
        $('.checkout-products .js-item').each(function() {
            allSummProduct += +$(this).data('price') * +$(this).find('.thumb-input-number input').val();
            quantity += (+$(this).find('.thumb-input-number input').val());
        });

            $('.all-product-price-el').attr('data-total_price', +allSummProduct)
            $('.all-product-price-el').text(+allSummProduct)
            $('#card-total-price').html(+allSummProduct);
            $('header .header-cart b').html(+allSummProduct);

        let getDeliveryPrice = checkCurrentDeliveryPrice()

        $('#summa').html(allSummProduct)
        checkPromocode()

        $('.final_price').html(allSummProduct + getDeliveryPrice)
        $('.prod-sum').html(quantity);

        $('.header-cart').find('i').text(quantity)

        //show empty cart message
        if (allSummProduct === 0) {
            $('.cart-empty-section').show();
            $('.checkout-section').hide();
            $('.cart-empty-message').show()
            let text1
            let text2
            switch (lang) {
                case 'uk':
                    text1 = "Ваш кошик порожній",
                        text2 = "Наповніть його товарами"
                    break;
                case 'ru':
                    text1 = "Ваша корзина пуста",
                        text2 = "Наповните его товарами"
                    break;
                case 'en':
                    text1 = "Your basket is empty",
                        text2 = "Fill it with products"
                    break;
                default:
                    break;
            }
            $('.header-cart').find('i').remove();
            $('.header-cart').find('.cart_total_price_p').remove();
            $('.header-cart').append(
                `<div class="tooltip">
                <div class="h6">
                    ${text1}
                </div>
                <div class="text">
                    ${text2}
                </div>
            </div>`
            );
        }
    }








    ///////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!////////////////////////////
    if (window.location.pathname == '/checkout' || window.location.pathname == `/${lang}/checkout`) _functions.calculateTotalCheckoutPrice();

    // $(document).on('click', '.js-checkout-product .thumb-input-number button', function() {
    //     _functions.calculateTotalCheckoutPrice();

    //     let prod = $(this).closest('.js-checkout-product'),
    //         productSum = +prod.data('price') * +prod.find('input').val();
    //     prod.find('.price').text(productSum);
    // });

    // //remove product from card
    // $(document).on('click', '.js-checkout-product .btn-close', function() {
    //     $(this).closest('.js-checkout-product').slideUp(0, function() {
    //         $(this).remove();
    //         _functions.calculateTotalCheckoutPrice();
    //     });
    // });


    //single product price
    _functions.calculateSinglePrice = function($parentEl) {
        let prod = $parentEl,
            productSum = +prod.attr('data-price') * +prod.find('input').val();

        prod.find('.price').text(productSum);
    }

    $(document).on('click', '.js-product .thumb-input-number button', function() {
        _functions.calculateSinglePrice($(this).closest('.js-product'));
    });
    $(document).on('click', '.js-complect .thumb-input-number button', function() {
        _functions.calculateSinglePrice($(this).closest('.js-complect'));
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //add product to cart in checkout
    $(document).on('click', '.checkout-products .js-checkout-product .thumb-input-number button', function() {
        let product_id = $(this).attr('data-product_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');
        let product_type = $(this).attr('data-product_type');
        let product_count = $(this).closest('.js-checkout-product').find('input').val();
        let product_s = $(this).attr('data-product_s');
        let product_h = $(this).attr('data-product_h');
        let product_l = $(this).attr('data-product_l');
        let product_l1 = $(this).attr('data-product_l1');
        let product_l2 = $(this).attr('data-product_l2');
        let product_b1 = $(this).attr('data-product_b1');
        let product_b2 = $(this).attr('data-product_b2');
        let product_m = $(this).attr('data-product_m');
        let product_d = $(this).attr('data-product_d');
        let product_additional_options = $(this).attr('data-additional_options');
        let product_collection = $(this).attr('data-product_collection_original')
        let variation_id = $(this).attr('data-variation_id');
        let general_options = $(this).attr('data-general_options');
        let add_chars = $(this).attr('data-add_chars')
        let data = { tempUser, product_type, product_s, product_h, product_l, product_l1, product_l2, product_m, product_d, product_additional_options, variation_id, general_options, product_id: product_id, quantity: product_count,product_collection, is_update: true, product_b1,product_b2,add_chars }

        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: data,
                    url: lang == 'uk' ? `/addCart` : `/${lang}/addCart`,
                    success: function(data) {
                        $.ajax({
                            type: "get",
                            url: lang == 'uk' ? '/booking/getCurrentCart' : `/${lang}/booking/getCurrentCart`,
                            dataType: 'JSON',
                            success: function(data) {
                                $('.cart').html(data.html)
                                    //_functions.calculateCartTotalPrice()
                            },
                            error: function(data) {}
                        })
                        _functions.calculateTotalCheckoutPrice();
                        _functions.calculateSinglePrice($(this).closest('.js-checkout-product'));
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        } else {
            _functions.calculateTotalCheckoutPrice();
        }
    });
    //add complect to cart in checkout
    $(document).on('click', '.checkout-products .js-checkout-complect .thumb-input-number button', function() {
        let product_id = $(this).attr('data-product_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');
        let product_type = $(this).attr('data-product_type');
        let product_count = $(this).closest('.js-checkout-complect').find('input').val();
        // let total_price = $(this).attr('data-price');
        let product_collection = $(this).attr('data-product_collection_original')
        let product_collection_length = $(this).closest('.js-checkout-complect').find('.prod_cheaper-item').length

        let data = { tempUser, product_type, product_id: product_id, quantity: product_count, product_collection_length, product_collection, is_update: true }

        if (jwtCookie || tempUser) {
            $.ajax({
                context: this,
                type: "post",
                data: data,
                url: lang == 'uk' ? `/addCart` : `/${lang}/addCart`,
                success: function(data) {
                    _functions.calculateTotalCheckoutPrice();
                },
                error: function(data) {

                }
            })
            _functions.calculateSinglePrice($(this).closest('.js-checkout-complect'));
        } else {
            _functions.calculateTotalCheckoutPrice();
        }
    });

    //remove complect product from checkout
    $(document).on('click', '.checkout-products .js-checkout-complect .btn-close', function() {
        let cart_id = $(this).attr('data-cart_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');

        let gTagData = {
            currency: "UAH",
            value: $(this).closest('.prod_cheaper').attr('data-price'),
            items: []
        }


        let product_s = $(this).attr('data-product_s');
        let product_h = $(this).attr('data-product_h');
        let product_l = $(this).attr('data-product_l');
        let product_l1 = $(this).attr('data-product_l1');
        let product_l2 = $(this).attr('data-product_l2');
        let product_m = $(this).attr('data-product_m');
        let product_d = $(this).attr('data-product_d');
        let product_b1 = $(this).attr('data-product_b1');
        let product_b2 = $(this).attr('data-product_b2');
        let prod_cats = $(this).data('product_cats')
        let prod_type = $(this).data('prod_type');


        let sizes = ''
            switch(prod_type){
                case 1:sizes = `${product_s}x${product_h}`
                break;
                case 2: {
                    if(product_h) sizes+=`${product_h}x`
                    if(product_s) sizes+=`${product_s}x`
                    if(product_d) sizes+=`${product_d}x`
                    if(product_m) sizes+=`${product_m}x`
                    if(product_l) sizes+=`${product_l}x`
                    if(product_l1) sizes+=`${product_l1}x`
                    if(product_l2) sizes+=`${product_l2}x`
                    if(product_b1) sizes+=`${product_b1}x`
                    if(product_b2) sizes+=`${product_b2}x`

                    sizes = sizes.split('')
                    sizes[sizes.length-1] = ""
                    sizes = sizes.join('')
                }
                break;
                case 4:  sizes = variation_value
                break;
            }



        let firstElObj = {
            item_id : $(this).attr('data-product_id'),
            item_name : $(this).attr('data-name'),
            price: $(this).attr('data-prod_price'),
            google_business_vertical: "retail",
            item_variant: sizes,
            quantity: 1
        }

        gTagData.items.push(firstElObj)

        let together_cheaper = $(this).attr('data-together-cheaper')
        if(together_cheaper) together_cheaper = JSON.parse(together_cheaper)
        if(together_cheaper && together_cheaper.length){
            //let totalValue = 0
            for(let item of together_cheaper){
                
                let obj = {
                    item_id: item?.id,
                    google_business_vertical: "retail",
                    quantity: 1,

                }

                let price = item.promotional_price
                let product_name =item.name
                let product_s = $(`.together-cheaper-product-id-${item.id}`).attr('data-s');
                let product_h = $(`.together-cheaper-product-id-${item.id}`).attr('data-h');
                let product_l = $(`.together-cheaper-product-id-${item.id}`).attr('data-l');
                let product_l1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l1');
                let product_l2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-l2');
                let product_m = $(`.together-cheaper-product-id-${item.id}`).attr('data-m');
                let product_d = $(`.together-cheaper-product-id-${item.id}`).attr('data-d');
                let product_b1 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b1');
                let product_b2 = $(`.together-cheaper-product-id-${item.id}`).attr('data-b2');
                let prod_cats =$(`.together-cheaper-product-id-${item.id}`).data('product_cats')
                let prod_type = $(`.together-cheaper-product-id-${item.id}`).data('product_type');
                let variation_value = $(`.together-cheaper-product-id-${item.id}`).data('variation_value');

                let sizes = ''
                switch(prod_type){
                    case 1:sizes = `${product_s}x${product_h}`
                    break;
                    case 2: {
                        if(product_h) sizes+=`${product_h}x`
                        if(product_s) sizes+=`${product_s}x`
                        if(product_d) sizes+=`${product_d}x`
                        if(product_m) sizes+=`${product_m}x`
                        if(product_l) sizes+=`${product_l}x`
                        if(product_l1) sizes+=`${product_l1}x`
                        if(product_l2) sizes+=`${product_l2}x`
                        if(product_b1) sizes+=`${product_b1}x`
                        if(product_b2) sizes+=`${product_b2}x`

                        sizes = sizes.split('')
                        sizes[sizes.length-1] = ""
                        sizes = sizes.join('')
                    }
                    break;
                    case 4:  sizes = variation_value
                    break;
                }

                obj.item_name = product_name
                obj.item_variant = sizes
                obj.price = price

                if(prod_cats){
                    for(let i=0;i<prod_cats.length;i++){
                        let keyName = i == 0 ? 'item_category' : `item_category${i+1}`



                        if(i == 0) obj[keyName] = prod_cats[i]
                        if(i != 0) obj[keyName] = prod_cats[i]
                    }
                }
                //totalValue+=parseFloat(price)

                gTagData.items.push(obj)
            }
        }    
        gtag("event", "remove_from_cart", gTagData)

        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: {cart_id: cart_id},
                    url: lang == 'uk' ? `/deleteCart` : `/${lang}/deleteCart`,
                    success: function(data) {
                        $(this).closest('.js-checkout-complect').slideUp(0, function() {
                            $(this).remove();
                            _functions.calculateTotalCheckoutPrice();
                        })
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        } else {
            $(this).closest('.js-checkout-complect').slideUp(0, function() {
                $(this).remove();
                _functions.calculateTotalCheckoutPrice();
            })
        }
    });

    //remove product from checkout
    $(document).on('click', '.checkout-products .js-checkout-product .btn-close', function() {
        let cart_id = $(this).attr('data-cart_id');
        let jwtCookie = readCookie('jwt');
        let tempUser = readCookie('tempUser');
        let product_count = $(this).closest('.js-checkout-product').find('input').val();
        let prod_cats = $(this).data('product_cats')
        let final_price = $(this).data('price')
        let prod_type = $(this).data('prod_type');
        let variation_value = $(this).data('variation_value');
        let product_name = $(this).data('name');
        let product_id = $(this).attr('data-product_id');

        let product_s = $(this).attr('data-product_s');
        let product_h = $(this).attr('data-product_h');
        let product_l = $(this).attr('data-product_l');
        let product_l1 = $(this).attr('data-product_l1');
        let product_l2 = $(this).attr('data-product_l2');
        let product_m = $(this).attr('data-product_m');
        let product_d = $(this).attr('data-product_d');
        let product_b1 = $(this).attr('data-product_b1');
        let product_b2 = $(this).attr('data-product_b2');
        let sizes = ''
            switch(prod_type){
                case 1:sizes = `${product_s}x${product_h}`
                break;
                case 2: {
                    if(product_h) sizes+=`${product_h}x`
                    if(product_s) sizes+=`${product_s}x`
                    if(product_d) sizes+=`${product_d}x`
                    if(product_m) sizes+=`${product_m}x`
                    if(product_l) sizes+=`${product_l}x`
                    if(product_l1) sizes+=`${product_l1}x`
                    if(product_l2) sizes+=`${product_l2}x`
                    if(product_b1) sizes+=`${product_b1}x`
                    if(product_b2) sizes+=`${product_b2}x`

                    sizes = sizes.split('')
                    sizes[sizes.length-1] = ""
                    sizes = sizes.join('')
                }
                break;
                case 4:  sizes = variation_value
                break;
            }

        let gTagData = {
            currency: "UAH",
            value: parseFloat(product_count) * parseFloat(final_price),
            items: [ 
                {
                    item_id: product_id,
                    item_name: product_name,
                    item_variant: sizes,
                    google_business_vertical: "retail",
                    price: final_price,
                    quantity: product_count
                }
            ]
        }

        if(prod_cats){
            for(let i=0;i<prod_cats.length;i++){
                let keyName = i == 0 ? 'item_category' : `item_category${i+1}`



                if(i == 0) gTagData.items[0][keyName] = prod_cats[i]
                if(i != 0) gTagData.items[0][keyName] = prod_cats[i]
            }
        }


        if (jwtCookie || tempUser) {
            $.ajax({
                    context: this,
                    type: "post",
                    data: {cart_id: cart_id},
                    url: lang == 'uk' ? `/deleteCart` : `/${lang}/deleteCart`,
                    success: function(data) {
                        $(this).closest('.js-checkout-product').slideUp(0, function() {
                            $(this).remove();
                            _functions.calculateTotalCheckoutPrice();
                            gtag("event", "remove_from_cart", gTagData)
                        });
                    },
                    error: function(data) {

                    }
                }).done(function() {

                })
                .fail(function() {

                });
        } else {
            $(this).closest('.js-checkout-product').slideUp(0, function() {
                $(this).remove();
                _functions.calculateTotalCheckoutPrice();
            });
        }
    });



    $(document).on('click', '.js-product-detail .product_detail-controls .thumb-input-number button', function() {
        let prod = $(this).closest('.js-product-detail'),
            productSum = +prod.attr('data-price') * +prod.find('.product_detail-controls input').val();

        prod.find('.price').text(productSum);
    });



    /* inputs  */
    if ($('.input-field-wrapper').length) {
        $('.input-field-wrapper:not(.calendar-wrapper)').each(function() {
            let widthInput = parseInt($(this).find('.input-placeholder').width());
            $(this).css('--placeholder-width', widthInput + 'px')
        });
    }
    $('.input-field-wrapper .input, .input-button-wrap .input').on('focus', function() {
        $(this).parent().addClass('focus');
    });
    $('.input-field-wrapper .input, .input-button-wrap .input').on('blur', function() {
        $(this).parent().removeClass('focus');
    });
    $('.input-field-wrapper .input').on('keyup', function() {
        if ($(this).val()) $(this).parent().addClass('value');
        else $(this).parent().removeClass('value');
    });

    // Invalid Input
    $('.input-field-wrapper .input[required]').on('blur', function() {
        if ($(this).val().trim()) {
            $(this).parent().removeClass('invalid');
        } else {
            $(this).parent().addClass('invalid');
        }
    });





    // custom_dropdown
    $(document).on('click', '.custom_dropdown-title', function(e) {
        $(this).toggleClass('active');
        $(this).closest('.custom_dropdown').find('.custom_dropdown-toggle').slideToggle(600);
    });

    // cabinet address table
    $('input[name="cabinet-address"]').on('change', function() {
        $('.cabinet_address tr').removeClass('active');
        $('input[name="cabinet-address"]:checked').closest('tr').addClass('active');
    });

    $('.cabinet_address .btn-close').on('click', function() {
        $(this).closest('tr').remove();
    });



    // config-tabs
    function clickOnConfigTab(item) {
        var tab = item.closest('.config-tabs').find('.config-tab');
        var i = item.index();

        item.addClass('active').siblings().removeClass('active');
        tab.eq(i).siblings('.config-tab:visible').fadeOut(function() {
            tab.eq(i).fadeIn();
        });


        // add class '.check' if in tab input checked 
        var li = item;
        let tabIndex;
        tab.each(function() {
            let $input = $(this).find(".checkbox-entry-wrap input");

            if ($input.is(':checked')) {

                tabIndex = $(this).closest('.config-tab').index();
                $(this).closest('.config-tab').addClass('check');
            }

            // if empty config-row
            $('.config-row').each(function () {
              let th = $(this);
              th.children().length
              
              if (th.children().length == 0) {
                th.remove()
              }
            });
        });

        li.each(function() {
            if ($(this).index() - 1 == tabIndex - 1) {
                $(this).prev().addClass('check-step');
            }
        });
    }

    $('.config-nav li').on('click', function(e) {
        e.preventDefault();
        let th = $(this);

        clickOnConfigTab(th);
        configSetValue();
    });


    if ($('.config-tabs').length) {
        // if empty config-row
        $('.config-row').each(function () {
          let th = $(this);
          th.children().length
          
          if (th.children().length == 0) {
            th.remove()
          }
        });



        $(this).find('.checkbox-entry-wrap').each(function() {
            let $this = $(this);
            let ratioPrice = $(this).data("ratio-price");
            let oldRatioPrice = $(this).data("old-ratio-price");

            if (!ratioPrice == '') {
                $this.find('.checkbox-entry b i').first().text(ratioPrice)
            } else {
                $this.find('.checkbox-entry b').first().css("display", "none");
            }
            if (!oldRatioPrice == '') {
                $this.find('.checkbox-entry .configurator_price-old i').text(oldRatioPrice)
            } else {
                $this.find('.checkbox-entry .configurator_price-old').css("display", "none");
            }
        });
        $(this).find('.config-checkbox-unchecked-none').each(function() {
            let $this = $(this);
            let ratioPrice = $(this).data("ratio-price");
            let oldRatioPrice = $(this).data("old-ratio-price");

            if (!ratioPrice == '') {
                $this.find('.checkbox-entry b i').first().text(ratioPrice)
            } else {
                $this.find('.checkbox-entry b').first().css("display", "none");
            }
            if (!oldRatioPrice == '') {
                $this.find('.checkbox-entry .configurator_price-old i').text(oldRatioPrice)
            } else {
                $this.find('.checkbox-entry .configurator_price-old').css("display", "none");
            }
        });
    }

    $('.config-checkbox-wrap .checkbox-entry input').on('change', function() {

        if ('.checkbox-entry input[name="cabinet-address"]:checked') {
            $(this).closest('.config-checkbox-wrap').addClass('active').parent().siblings().find('.config-checkbox-wrap').removeClass('active')
        }
    });



    // tabs
    $('.tab-title').on('click', function() {
        $(this).parent().toggleClass('active');
    });
    $('.tab-toggle div').on('click', function() {
        var tab = $(this).closest('.tabs').find('.tab');
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        tab.eq(i).siblings('.tab:visible').fadeOut(function() {
            tab.eq(i).fadeIn();
            tab.find('.input-field-wrapper').each(function() {
                let widthInput = parseInt($(this).find('.input-placeholder').width());
                $(this).css('--placeholder-width', widthInput + 'px')
            });
        });
        $(this).closest('.tab-nav').removeClass('active').find('.tab-title').text($(this).text());
        tab.find('.bg-wrapper.sticky-item').removeClass('is_stuck').removeAttr('style');
    });

    // Category select
    $('.category-title').on('click', function() {
        $(this).parent().toggleClass('active');
    });
    $('.categories-list li').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parents('.category-menu').removeClass('active').find('.category-title').text($(this).find('a').text());
    });

    // accordion
    $(document).on('click', '.accordion:not(.employment-accord) .accordion-item .accordion-title', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next().slideUp();
        } else {
            $(this).closest('.accordion').find('.accordion-title').not(this).removeClass('active').next().slideUp();
            $(this).addClass('active').next().slideDown();
        }
    });


    //visible more text seo block
    $(document).on('click', '.more-text .read-more', function() {
        $(this).parents('.more-text').toggleClass('open');
        $(this).parent().find('.text').slideToggle(555);
        if ($(this).parent().hasClass('open')) {
            $(this).find('b').text($(this).data('read-less'));
        } else {
            $(this).find('b').text($(this).data('read-more'));
        }
    });

    //cookies-informer
    let dataTime = +$('.cookies-informer').data('time');
    setTimeout(function() {
        $('.site-ready .cookies-informer').addClass('active');
    }, dataTime);
    $(document).on('click', '.cookies-informer .close-cookies', function() {
        $(this).parents('.cookies-informer').removeClass('active');
    });


    //action-informer
    let dataTimeAction = +$('.action-informer').data('time');
    setTimeout(function() {
        $('.site-ready .action-informer').addClass('active');
    }, dataTimeAction);
    $(document).on('click', '.action-informer .btn-close', function() {
        $(this).parents('.action-informer').removeClass('active');
    });




    //search in header
    $(document).on('click', '.search-btn-wrapper', function() {
        $('.search-wrapper').addClass('active');
        $('header').removeClass('open-menu');
        $('.hamburger').removeClass('is-active');
        $('.search-wrapper input[type="search"]').focus();
    });
    $(document).on('click', '.search-close', function() {
        $('.search-wrapper').removeClass('active');
        $('.search-wrapper').find('input[type="search"]').val('');
    });
    $(document).on('click', '.sort-wrap .search-inner .search-close', function() {
        $(this).siblings('input[type="search"]').val('');
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest('header').find(".search-wrapper").length) {
            $('.search-wrapper').removeClass('active');;
        }
    });



    if ($('.input-search').length) {
        $('.input-search').each(function() {
            $(this).autocomplete({
                source: function(request, response) {
                    $.ajax({
                        type: 'post',
                        url: lang == 'uk' ? '/searchItems' : `/${lang}/searchItems`,
                        dataType: 'JSON',
                        data: { search: this.element[0].value },
                        success: function(data) {

                            response(data);
                        }
                    })
                    return;
                }
            }).autocomplete('instance')._renderItem = function(ul, item) {
                const link = $(`<a class="search-item" href=/${item.slug}></a>`);
                const img = $(` <div class="search-item-img"><img src=${item.image} alt="preview image"/></div>`);
                const title = $(`<div class="search-item-title">${item.name}</div>`);

                link.append(img);
                link.append(title);

                return $('<li>').append(link).appendTo(ul);
            };
        });
    }



    $(document).on('click', '.filter-title', function() {
        $(this).toggleClass('active');
        $(this).next('.filter-inner').slideToggle(500);
    });


    if ($(window).width() < 768) {

        $('.sidebar-btn').on('click', function() {
            $(this).toggleClass('active');
            $('.sidebar').toggleClass('active');
            if ($(this).hasClass('active')) {
                $('html').addClass('overflow-sidebar')
            } else {
                $('html').removeClass('overflow-sidebar')
            }
        });
        $('.sidebar-overlay').on('click', function() {
            $(this).siblings('.sidebar').removeClass('active');
            $(this).siblings('.sidebar-btn').removeClass('active');
            $('html').removeClass('overflow-sidebar')
        });
    }


    $(document).on("click", ".filter .btn-show-all", function() {
        $(this).toggleClass('close');

        let $parent = $(this).parent();
        let $category = $parent.find(".filter-list li:gt(4)");

        if ($category.is(":visible")) {
            $category.hide("slow");
            $('.btn-show-all').text($(this).data('orig-text'));
        } else {
            $category.show("slow");
            $('.btn-show-all').text($(this).data('active-text'));
        }
        return false;
    });


    // $(document).on('click', '.sidebar-btn-reset', function() {
    //     let $parent = $(this).parent();

    //     $parent.find('.filter input[type=checkbox]').each(function() {
    //         this.checked = false;
    //     });
    //     //_functions.upDateRange();
    // });




    $('.file-item').each(function() {
        let $title = $(this).find('.file-item-title').text().trim();
        $(this).attr('download', $title);
    });


    $('.rate-stars').each(function(index) {
        $(this).find('input').attr('name', 'rating-' + index);

        $($(this).find('input').get().reverse()).each(function(index) {
            $(this).attr('id', 'rating-' + index);
        });
    });


    if ($('.feedback-list').length) {

        $('.review-item .review-rating').each(function() {
            let $this = $(this);
            let starRating = $(this).data("rate-star");

            if (!starRating == '') {
                $(this).addClass('selected-rate')

                $($this.find('i')).each(function() {
                    if ($(this).index() + 1 == starRating) {
                        $(this).addClass('checked-star')
                    }
                });
            }
        });
    }




    $(document).on('click', '.review-item .review-btn', function() {
        let slideForm = $(this).parents('.review-item').find('.review-bottom-form');
        slideForm.slideToggle(500);

        slideForm.find('.input-field-wrapper').each(function() {
            let widthInput = parseInt($(this).find('.input-placeholder').width());
            $(this).css('--placeholder-width', widthInput + 'px')
        });
    });
    //remove product from card
    $(document).on('click', '.cc-option-close', function() {
        let attr = $(this).attr('data-atr-gr-origin_id')

        if(attr == 32){
           let find =  $(this).closest('.cc-option-wrapper').find('[data-atr-gr-origin_id="8"]')
           find.closest('.cc-option-item').slideUp(400, function() {
            $(this).remove();
        })
        }
        if(attr == 35){
            let find =  $(this).closest('.cc-option-wrapper').find('[data-atr-gr-origin_id=95]')
            find.closest('.cc-option-item').slideUp(400, function() {
             $(this).remove();
         })
        }
        if(attr == 14){
            let find =  $(this).closest('.cc-option-wrapper').find('[data-atr-gr-origin_id=101]')
            find.closest('.cc-option-item').slideUp(400, function() {
             $(this).remove();
         })
        }
        if(attr == 17){
            let find =  $(this).closest('.cc-option-wrapper').find('[data-atr-gr-origin_id=98]')
            find.closest('.cc-option-item').slideUp(400, function() {
             $(this).remove();
         })
        }
        $(this).closest('.cc-option-item').slideUp(400, function() {
            $(this).remove();
        })
    });
 
    /* sticky item */
    _functions.stickyInit = function() {
        setTimeout(function() {
            if ($(window).width() >= 320 && $('.sticky-parent').length) {
                let top;
                $(".sticky-item").stick_in_parent({
                    parent: '.sticky-parent',
                    inner_scrolling: false,
                    offset_top: 0,
                })
            } else {
                $(".sticky-item").trigger("sticky_kit:detach");
            }

            if ($(window).width() >= 992 && $('.sticky-gap').length) {
                $(".sticky-gap-item").stick_in_parent({
                    parent: '.sticky-gap',
                    inner_scrolling: false,
                    offset_top: $('.header-inner').height(),
                })
            } else {
                $(".sticky-gap-item").trigger("sticky_kit:detach");
            }
        }, 200);
    };
    _functions.stickyInit();



    // =============================
    // Forse reloading page when back or forward browser button has been clicked 
    // =============================
    $(window).on("popstate", function(event) {
        window.location.reload();
    });

    if ($('.config-nav').length) {
        configSetValue();
    }

    function configSetValue() {
        $('.config-nav li').each(function() {
            let th = $(this);

            if (th.hasClass('active')) {
                let itemPrev = th.prev(),
                    itemNext = th.next(),
                    itemPrevText = itemPrev.text().replace(/ +/g, ' ').trim(),
                    itemNextText = itemNext.text().replace(/ +/g, ' ').trim();

                $('.config-top-navigation .arrow-left span').text(itemPrevText);
                $('.config-top-navigation .arrow-right span').text(itemNextText);

                if (!itemPrev.length) {
                    $('.config-top-navigation .arrow-left').addClass('disabled');
                } else {
                    $('.config-top-navigation .arrow-left').removeClass('disabled');
                }

                if (!itemNext.length) {
                    $('.config-top-navigation .arrow-right').addClass('disabled');
                } else {
                    $('.config-top-navigation .arrow-right').removeClass('disabled');
                }
            }
        });
    }

    function scrollToConfigItem(item) {
        if($(window).width() < 575) {
            let scrollToActive = item.offset().left + item.outerWidth(true)/2 + $('.config-nav').scrollLeft() - $('.config-nav').width()/2;
            $(".config-nav").animate({scrollLeft: scrollToActive - 30}, 400);
        }
    }

    $(document).on('click', '.config-top-navigation-link', function(e) {
        e.preventDefault();
        let th = $(this),
            tabActive = $('.config-nav li.active'),
            tabPrev = tabActive.prev(),
            tabNext = tabActive.next();

        if (th.hasClass('arrow-left')) {
            clickOnConfigTab(tabPrev);
            scrollToConfigItem(tabPrev);
            configSetValue();
        }

        if (th.hasClass('arrow-right')) {
            clickOnConfigTab(tabNext);
            scrollToConfigItem(tabNext);
            configSetValue();
        }
    });


    // click radio
    if($('.config-wrapper').length) {  

        // radio in Config group 
        $(document).on("change", '.config-group input[type=radio]:not(.toggle-block-control)', function() {
          const th = $(this);
          const inputsGroup = th.closest('.config-group').find('.checkboxes-block input[type=radio]');
          const wrapper = th.closest('.config-checkbox-wrap');
          const thParent = wrapper.find('.checkbox-entry-wrap').not('.checkboxes-block .checkbox-entry-wrap');


          // When click on child then parent checked too
          if (th.parents('.checkboxes-block').length) {
            thParent.find('input').prop('checked', true);

          } else {

            // When click on parent unchecked child in siblings blocks
            inputsGroup.each(function () {
              let input = $(this);

              if (input.is(':checked')) {
                input.prop('checked', false);
              }
            });

            // Check first input
            wrapper.find('.checkboxes-block input[type=radio]').each(function (i) {
              let t = $(this);
              if (i == 0) t.prop('checked', true)
            });
          }
        });


        $(document).on('change', '.checkbox-entry-num input[type=radio]', function(e) {
          const th = $(this);
          const option = th.closest('.checkbox-entry-num').attr('data-no_option');
          const numBlock = th.closest('.config-tab-inner').find('.config-group-num');

          if (option == '1') {
            numBlock.slideUp(150, function() {
              numBlock.find('input[type=radio]:checked').prop('checked', false)
              // _functions.chengeProductOptions();
            });
        
          } else {
            numBlock.slideDown(150, function() {
              numBlock.find('input[type=radio]').each(function (i) {
                let t = $(this);
                if (i == 0) {
                  t.prop('checked', true)
                  // _functions.chengeProductOptions();
                }
                
              });
            });
          }
        });
    }



    $(document).ready(function() {
        let $this = $('.input-field-wrapper .input:-webkit-autofill')
        if ($this.length) {
            $this.closest('.input-field-wrapper').addClass('focus');
        }
    });

});