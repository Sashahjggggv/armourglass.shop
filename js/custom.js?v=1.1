const lang = $('body').data("lang")
let activeLink = window.location.pathname;

jQuery(function($) {

    /********************************************************* */
    /***********************GENERAL*************************** */
    /********************************************************* */

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    /********************************************************* */
    /********************************************************* */
    /********************************************************* */

    /********************************************************* */
    /*******Form AND General Action/Cookie Popups************* */
    /********************************************************* */

    if (document.querySelector(".form")) {
        document.querySelector(".form").onsubmit = function(e) {

            e.preventDefault()
            let data = {
                'email': $('.form-email-field').val(),
                "message": $('.form-textarea-field').val(),
                "name": $('.form-name-field').val(),
                "form_id": $('.form').data("form_id"),
            }


            $.ajax({
                type: "post",
                url: '/addNewComment',
                data: data,
                dataType: 'JSON',
                success: function(data) {

                    _functions.openPopup(`.popup-content[data-rel="12"]`);

                    document.querySelector(".form").reset();

                },
                error: function(data) {
                    console.warn(data);
                }
            });
            return false
        }
    }
    $(document).ready(function() {
        if (document.querySelector(".action-popup")) {
            document.querySelector(".action-popup").display = "block"
            document.querySelector(".cookies-informer").display = "block"
            let checkIfPromotionPopupMustBeHidden = getCookie("isPromotionHidden")
            if (checkIfPromotionPopupMustBeHidden) {
                document.querySelector(".action-popup").style.display = "none"
            }
            document.querySelector(".action-popup .btn-close").onclick = function() {
                setCookie("isPromotionHidden", true, 30)
            }
        }
        if (document.querySelector(".cookies-informer")) {
            let checkIfCookiePopupMustBeHidden = getCookie("isReadCookiesPopup")
            if (checkIfCookiePopupMustBeHidden) {
                document.querySelector(".cookies-informer").style.display = "none"
            }
            document.querySelector(".cookie-popup-agree-btn").onclick = function() {
                setCookie("isReadCookiesPopup", true, 30)
            }
        }
        if($('.checkout-section').length){
            let gTagData = $('.checkout-section').attr("data-gTagData")
            if(gTagData){
                gTagData = JSON.parse(gTagData)
                gtag("event", "begin_checkout", gTagData)
                $('.checkout-section').attr("data-gTagData", "")
            } 
        }
        if($('.thankYou-block').length){
            let gTagData = $('.thankYou-block').attr("data-gTagData")
            if(gTagData){
                gTagData = JSON.parse(gTagData)
                gtag("event", "purchase", gTagData)
                $('.thankYou-block').attr("data-gTagData", "")
            } 
        }
    });





    ///**************HEADER FORM************* */
    if (document.querySelector(".header-form")) {
        document.querySelector(".header-form").onsubmit = function(e) {

            e.preventDefault()
            let data = {
                
                
                "name": $('.header-form-name-field').val(),
                "phone": $('.header-form-phone-field').val(),
                "form_id": $('.header-form-btn').data("form_id"),
                "header_popup": true
            }


            $.ajax({
                type: "post",
                url: '/addNewComment',
                data: data,
                dataType: 'JSON',
                success: function(data) {

                    _functions.openPopup(`.popup-content[data-rel="11-1"]`);

                    document.querySelector(".header-form").reset();

                },
                error: function(data) {
                    console.warn(data);
                }
            });
            return false
        }
    }


    /********************************************************* */
    /********************************************************* */
    /********************************************************* */

    /********************************************************* */
    /***********************FAV******************************* */
    /********************************************************* */

    $(document).on("click", ".add-to-fav", function() {
        let product_id = $(this).attr('data-product_id');
        let product_count = 1
        let prod_cats = $(this).data('product_cats')
        let prod_type = $(this).data('product_type');
        let final_price = $(this).data('total_price')
        let variation_value = $(this).data('variation_value');
        let product_name = $(this).data('product_name');

        let product_s = $(this).attr('data-s');
        let product_h = $(this).attr('data-h');
        let product_l = $(this).attr('data-l');
        let product_l1 = $(this).attr('data-l1');
        let product_l2 = $(this).attr('data-l2');
        let product_m = $(this).attr('data-m');
        let product_d = $(this).attr('data-d');
        let product_b1 = $(this).attr('data-b1');
        let product_b2 = $(this).attr('data-b2');


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
        gtag("event", "add_to_wishlist", gTagData)

        let ifUser = getCookie('jwt')
        let element = $('.add-to-fav')
        if (ifUser) {
            $.ajax({
                type: "post",
                url: '/client/addfavorites',
                data: {
                    "product_id": $(this).data("product_id"),
                },
                dataType: 'JSON',
                success: function(data) {
                    element.removeClass('add-to-fav')
                    element.addClass('remove-favourites-btn')
                    if (document.querySelector('.header-fav .tooltip')) document.querySelector('.header-fav .tooltip').remove()
                    if(data == 1){
                        let elem = document.createElement("i");
                        elem.classList.add("fav-counter")
                        elem.innerHTML = data
                        document.querySelector('.header-fav .h-icon').after(elem)
                    } else if(data > 1){
                        $('.header-fav .fav-counter').html(data)
                    }
                    document.querySelector('.fav-a-tag').href = "/client/cabinet/favorites"

                },
                error: function(data) {
                    console.warn(data)
                }
            })
        } else {
            let favArr = getCookie('fav')
            if (!favArr) {
                setCookie('fav', this.dataset.product_id, 30)
                favArr = getCookie('fav').split(',')
                let elem = document.createElement("i");
                elem.classList.add("fav-counter")
                elem.innerHTML = favArr.length
                document.querySelector('.header-fav .h-icon').after(elem)
                if (document.querySelector('.header-fav .tooltip')) document.querySelector('.header-fav .tooltip').remove()
                $(this).removeClass('add-to-fav')
                $(this).addClass('remove-favourites-btn')
            } else {
                favArr = favArr.split(',')
                favArr.push(this.dataset.product_id)
                favArr.join(",")
                setCookie('fav', favArr, 30)
                document.querySelector('.header-fav .fav-counter').innerHTML = favArr.length
                $(this).removeClass('add-to-fav')
                $(this).addClass('remove-favourites-btn')
            }
            document.querySelector('.fav-a-tag').href = "/client/favorites"
        }

    })

    $(document).on("click", ".remove-favourites-btn", function() {
        let ifUser = getCookie('jwt')
        let element = $('.remove-favourites-btn')
        if (ifUser) {
            $.ajax({
                type: "post",
                url: '/client/deleteFavorites',
                data: {
                    "product_id": $(this).data("product_id"),
                },
                dataType: 'JSON',
                success: function(data) {
                    element.addClass('add-to-fav')
                    element.removeClass('remove-favourites-btn')
                    $('.header-fav .fav-counter').html(data)
                    if(data == 0) $('.header-fav .fav-counter').remove()
                },
                error: function(data) {
                    console.warn(data)
                }
            })
        } else {
            let favArr = getCookie('fav')
            if (favArr) {
                favArr = favArr.split(',')
                let newFavArr = []
                favArr.forEach((item) => {
                    if (item !== this.dataset.product_id) newFavArr.push(item)
                })
                newFavArr.join(",")
                setCookie('fav', newFavArr, 30)
                favArr = getCookie('fav').split(',')
                if (!favArr[0]) {
                    document.querySelector('.header-fav .fav-counter').remove()
                        //     let text,text2
                        // switch (lang) {
                        //     case 'uk':
                        //         text = 'Ваш список побажань порожній'
                        //         text2 = 'Наповніть його товарами'
                        //         break;
                        //         case 'ru':
                        //             text = 'Ваш список побжеланий пуст'
                        //             text2 = 'Наполните его товарами'
                        //             break;
                        //             case 'en':
                        //                 text = 'Your wish list are empty'
                        //                 text2 = 'Fill it with products'
                        //         break;
                        //     default:
                        //         break;
                        // }
                        //     document.querySelector('.header-fav').append(`
                        //     <div class="tooltip fav-tooltip">
                        //             <div class="h6">
                        //                 ${text}
                        //             </div>
                        //             <div class="text">
                        //                 ${text2}
                        //             </div>
                        //         </div>`
                        //         )
                } else document.querySelector('.header-fav .fav-counter').innerHTML = favArr.length
            }
        }
        document.querySelector('.fav-a-tag').removeAttribute("href")
        $(this).addClass('add-to-fav')
        $(this).removeClass('remove-favourites-btn')
    })

    /********************************************************* */
    /********************************************************* */
    /********************************************************* */

    /********************************************************* */
    /***************CREATE ORDER LOGIC************************ */
    /********************************************************* */
    $(document).on('change', 'input[name=delivery]', function() {
        if($('.final_price').attr('data-delivery-price')){
            $('.final_price').html(+$('.final_price').html() - +$('.final_price').attr('data-delivery-price'))
        }


        $('.price-delivery .cont b').html($(this).data('default_price'))
        $('.final_price').attr('data-delivery-price',+$('.price-delivery .cont b').html())
        $('.final_price').html(+$('.final_price').html() + +$('.final_price').attr('data-delivery-price'))

        if ($(this).data('default_price')>0) {
            $('.price-delivery').show()
        } else {
            $('.price-delivery .cont b').html(0)
            $('.price-delivery').hide()


        }
       // _functions.calculateTotalCheckoutPrice();
    })



    $(document).on('click', '.main-order-button', function() {
        let element =  $(this)
        element.removeClass('main-order-button')
        let block = $('.main-order-wrapp')
        if (document.querySelector(".input-button-warning-order")) document.querySelector(".input-button-warning-order").remove();
        let selected_pick_up
        let city
        let street
        let house
        let apartment
        let department
        let textAddress
        let delivery_type = $('input[name=delivery]:checked').val()
        let payment_type = $('input[name=paymentType]:checked').val()
        if ($('.self-pickup-select')) {
            if($('.self-pickup-select option:selected').val()){
                selected_pick_up = $('.self-pickup-select option:selected').val().trim()
            } else selected_pick_up = null
            textAddress = selected_pick_up 
        }
        if(delivery_type == 3){
            if ($('.select-address-lviv')) {
                city = $('.select-address-lviv option:selected').data("city")
                street = $('.select-address-lviv option:selected').data("street")
                house = $('.select-address-lviv option:selected').data("house")
                apartment = $('.select-address-lviv option:selected').data("apartment")
                
            } 
            if(!street || !house) {
                street = $('.street-address-lviv').val()
                house = $('.house-address-lviv').val()
            }
            textAddress = `${city} ${street} ${house} ${apartment}`
        }
        if(delivery_type == 4){
            if ($('.select-address-general')) {
                city = $('.select-address-general option:selected').data("city")
                street = $('.select-address-general option:selected').data("street")
                house = $('.select-address-general option:selected').data("house")
                apartment = $('.select-address-general option:selected').data("apartment")
            }
            if(!city || !street || !house){
                city = $('.city-address-general').val()
                street = $('.street-address-general').val()
                house = $('.house-address-general').val()
                apartment = $('.apartment-address-general').val()
            }
            textAddress = `${city} ${street} ${house} ${apartment}`
        }
       
        if(delivery_type == 2){
            if ($('.novaPoshta-city') && $('.novaPoshta-warehouse')) {
                city = $('.novaPoshta-city').val().trim()
                department = $('.novaPoshta-warehouse option:selected').text().trim()
                textAddress = `${city} ${department}`
            }
        }
        let textarea = $(".comment").val()
        let comment = textarea
        let first_name = $('.order-first-name').val()
        let last_name = $('.order-last-name').val()
        let father_name = $('.order-father-name').val()
        let delivery_date = $('.order-calendar').val()
        let email = $('.order-email').val()
        let phone = $('.order-phone').val()
        let promocode_title = $('.promocode-input').data('promocode_title')
        let parts_count
        let from_epic
        if($('.checkout-row').attr('data-from_epic') == "true"){
            from_epic = true
            let deliveryTypesJSON = $('.checkout-row').attr('data-configDeliveryTypes')
            deliveryTypesJSON = JSON.parse(deliveryTypesJSON)
            comment = `Тип доставки - ${deliveryTypesJSON[delivery_type].text['uk']}, Адреса доставки - ${textAddress}`
        }
        if ($('#parts_count')) {
            parts_count = $('#parts_count').val()
        }
        let parts_count2
        if ($('#parts_count2')) {
            parts_count2 = $('#parts_count2').val()
        }

        if(!payment_type && from_epic) payment_type = 6

        $.ajax({
            type: "post",
            url: lang == 'uk' ? '/checkout' : `/${lang}/checkout`,
            data: {
                "tempUser": getCookie("tempUser"),
                "first_name": first_name,
                "last_name": last_name,
                "father_name": father_name,
                "email": email,
                "phone": phone,
                "self_pickup": selected_pick_up,
                "city": city,
                "street": street,
                "house": house,
                "apartment": apartment,
                "department": department,
                "delivery_type": delivery_type,
                "parts_count": parts_count,
                "parts_count2": parts_count2,
                "payment_type": payment_type,
                "comment": comment,
                "promocode_title": promocode_title,
                "delivery_date":delivery_date
            },
            dataType: 'JSON',
            success: function(data) {
                element.addClass('main-order-button')
                window.location.href = data.link
            },
            error: function(data) {
                block.after(`
                <div class="input-button-warning-order">
                    <div class="error-msg promocode-error-order">
                    ${data.responseJSON.message}
                    </div>
                </div>`)
                if(!$('.order-first-name').val()) $('.order-first-name').parent().addClass('invalid')
                if(!$('.order-last-name').val()) $('.order-last-name').parent().addClass('invalid')
                if(!$('.order-father-name').length) if(!$('.order-email').val()) $('.order-email').parent().addClass('invalid')
                if(!$('.order-phone').val()) $('.order-phone').parent().addClass('invalid')
                element.addClass('main-order-button')
                //block.after(`<div class="form-error-field"></div>`)
                //console.warn(data)
            }
        }).done(function() {
           
            // hide spinner
            $('#loading').hide();
        });
        return false


    })

    /********************************************************* */
    /********************************************************* */
    /********************************************************* */


})