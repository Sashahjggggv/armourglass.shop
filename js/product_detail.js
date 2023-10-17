jQuery(function ($) {

let originalConfLink = $(".conf-btn").attr("data-original_href",$(".conf-btn").attr("href"))

function reCalculateProduct(custom_s, custom_h, product_id, custom_l, custom_l1, custom_l2, custom_m, custom_d,variation_id,default_atr,custom_b1,custom_b2) {

    if(!custom_s && !custom_h && !variation_id) return false

    let arr = []
    if(default_atr){
        default_atr = JSON.parse(default_atr)
        arr.push(default_atr)
    } 

    let add_chars = []
    $('.change-add-chars').each((index,el) => {
        let obj = {
            id: $(el).attr("data-char_id"),
            value: $(el).val()
        }
        add_chars.push(obj)
    })

    let sendData = {
        custom_s,
        custom_h,
        product_id,
        custom_l, 
        custom_l1, 
        custom_l2, 
        custom_m,
        custom_d,
        variation_id,
        default_atr: arr && arr.length ? arr : null,
        custom_b1,
        custom_b2,
        add_chars
    }

    $.ajax({
        type: "post",
        url: lang == 'uk' ? `/shop/reCalculateProduct` : `/${lang}/shop/reCalculateProduct`,
        data: sendData,
        dataType: 'JSON',
        success: function(data) {
            sendData.from_detail = true
            let configuratorSizesLink = originalConfLink.attr("data-original_href")
            configuratorSizesLink = configuratorSizesLink +'?'+jQuery.param(sendData)
            $(".conf-btn").attr("href",configuratorSizesLink)
            if(data.discounted_price){
                $('.product_price-old').show();
                $('.product_price-old .price-old').html(Math.round(data.price));
            }else{
                $('.product_price-old').hide();
            }
            $('.price-div .price').html(data.discounted_price ? Math.round(data.discounted_price) : Math.round(data.price))
            document.querySelector('.order-btn.add_to-cart').dataset.total_price = data.discounted_price ? Math.round(data.discounted_price) : Math.round(data.price)
            document.querySelector('.product_block').dataset.price = data.discounted_price ? Math.round(data.discounted_price) : Math.round(data.price)
            if(custom_s) document.querySelector('.order-btn.add_to-cart').dataset.s = custom_s
            if(custom_h) document.querySelector('.order-btn.add_to-cart').dataset.h = custom_h

            if(custom_l) document.querySelector('.order-btn.add_to-cart').dataset.l = custom_l
            if(custom_l1) document.querySelector('.order-btn.add_to-cart').dataset.l1 = custom_l1
            if(custom_l2) document.querySelector('.order-btn.add_to-cart').dataset.l2 = custom_l2
            if(custom_b1) document.querySelector('.order-btn.add_to-cart').dataset.b1 = custom_b1
            if(custom_b2) document.querySelector('.order-btn.add_to-cart').dataset.b2 = custom_b2
            if(custom_m) document.querySelector('.order-btn.add_to-cart').dataset.m = custom_m
            if(custom_d) document.querySelector('.order-btn.add_to-cart').dataset.d = custom_d
            if(add_chars && add_chars.length) document.querySelector('.order-btn.add_to-cart').dataset.add_chars = JSON.stringify(add_chars)
            
            if(custom_s) document.querySelector('.buyInOneClickBtn').dataset.product_s = custom_s
            if(custom_h) document.querySelector('.buyInOneClickBtn').dataset.product_h = custom_h
            if(custom_l) document.querySelector('.buyInOneClickBtn').dataset.l = custom_l
            if(custom_l1) document.querySelector('.buyInOneClickBtn').dataset.l1 = custom_l1
            if(custom_l2) document.querySelector('.buyInOneClickBtn').dataset.l2 = custom_l2
            if(custom_b1) document.querySelector('.buyInOneClickBtn').dataset.b1 = custom_b1
            if(custom_b2) document.querySelector('.buyInOneClickBtn').dataset.b2 = custom_b2
            if(custom_m) document.querySelector('.buyInOneClickBtn').dataset.m = custom_m
            if(custom_d) document.querySelector('.buyInOneClickBtn').dataset.d = custom_d
            if(add_chars && add_chars.length) document.querySelector('.buyInOneClickBtn').dataset.add_chars = JSON.stringify(add_chars)

            if(data.shower_type && data.shower_type == 5){
                if(custom_l1) document.querySelector('.buyInOneClickBtn').dataset.l1 = data.l1.value
                if(custom_l2) document.querySelector('.buyInOneClickBtn').dataset.l2 = data.l2.value
                if(custom_l1) document.querySelector('.order-btn.add_to-cart').dataset.l1 = data.l1.value
                if(custom_l2) document.querySelector('.order-btn.add_to-cart').dataset.l2 = data.l2.value
                $('.change-l1').val(data.l1.value)
                $('.change-l2').val(data.l2.value)
            }

            $('.prod_quantity input').val(1)



            if(data.new_image_path){
                $('.main-image').attr('data-src',data.new_image_path)
                $('.main-image').find('picture source').attr('srcset',data.new_image_path)
                $('.main-image').find('picture img').attr('src',data.new_image_path)
            }

            if(data.discounted_price){
                if($('.product_price-old').hasClass('d-none')){
                    $('.product_price-old').removeClass('d-none')
                    $('.price-old').html(data.price)
                    $('.price').html(data.discounted_price)
                }
            }

        },
        error: function(data) {}
    })
}

$(document).on('keypress',function(e) {
    if($(this).closest('.oneClickBuyForm').length) return false
    if(e.which == 13) {
        reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
        $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'), $('.change-b1').val(), $('.change-b2').val())
    }
});

$(document).on("blur", "input", function () {
    if($(this).closest('.oneClickBuyForm').length) return false
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
            $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})

$( document ).ready(function() {
    if($(".tab-toggle div").length == 1){
        $('.tab-toggle div').hide()
        $('.tabs.type-2 .col-12').html('<div class="spacer spacer-xl"></div>')
    } 
    if($('.colors').length){
        $('.order-btn.add_to-cart').attr('data-color',$('.colors option:selected').attr('data-color'))
        $('.buyInOneClickBtn').attr('data-color',$('.colors option:selected').attr('data-color'))
    }

    let product_id = $('.fav-btn').attr('data-product_id');
    let product_count = 1
    let prod_cats = $('.fav-btn').data('product_cats')
    let prod_type = $('.fav-btn').data('product_type');
    let final_price = $('.fav-btn').data('total_price')
    let variation_value = $('.fav-btn').data('variation_value');
    let product_name = $('.fav-btn').data('product_name');

    let product_s = $('.fav-btn').attr('data-s');
    let product_h = $('.fav-btn').attr('data-h');
    let product_l = $('.fav-btn').attr('data-l');
    let product_l1 = $('.fav-btn').attr('data-l1');
    let product_l2 = $('.fav-btn').attr('data-l2');
    let product_m = $('.fav-btn').attr('data-m');
    let product_d = $('.fav-btn').attr('data-d');
    let product_b1 = $('.fav-btn').attr('data-b1');
    let product_b2 = $('.fav-btn').attr('data-b2');


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
    gtag("event", "view_item", gTagData)


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
    if(add_chars && add_chars.length){
        if(add_chars && add_chars.length) document.querySelector('.order-btn.add_to-cart').dataset.add_chars = JSON.stringify(add_chars)
        if(add_chars && add_chars.length) document.querySelector('.buyInOneClickBtn').dataset.add_chars = JSON.stringify(add_chars)
    }
    
});


    //plus-minus-step-10
    $(document).on('click', '.decrement-step-10', function() {
        let $this = $(this),
            $input = $this.parent().find('input'),
            hasMin = $input[0].hasAttribute('min'),
            value = parseInt($input.val(), 10),
            min = hasMin ? +$input.attr('min') : 1;

        if (value != min) {
            value = value - 10;
        } else {
            value = min;
        }

        Math.ceil($input.val(value));
    });

    $(document).on('click', '.increment-step-10', function() {
        let $this = $(this),
            $input = $this.parent().find('input'),
            hasMax = $input[0].hasAttribute('max'),
            value = parseInt($input.val(), 10),
            max = hasMax ? +$input.attr('max') : 1;
            if (value < max) {
                value = value + 10;
            } else {
                value = max;
            }
        Math.ceil($input.val(value));
    });
    ////////


$(document).on('change', '.set-custom-size-block', function() {
    let s = $('.default-sizes option:selected').data('s')
    let h = $('.default-sizes option:selected').data('h')

    $('.thumb-input-number-height input').val(h)
    $('.thumb-input-number-width input').val(s)
})

$('.default-sizes').change(function() {
    reCalculateProduct($(this).find(':selected').data('s'), $(this).find(':selected').data('h'), $(this).find(':selected').data('product_id'),null,null,null,null,null,null,$('.colors option:selected').attr('data-color'),null)
})

$('.colors').change(function() {
    

   if(!$('.thumb-input-number-height input').val()) $('.thumb-input-number-height input').val($('.default-sizes option:selected').data('h'))
   if(!$('.thumb-input-number-width input').val())  $('.thumb-input-number-width input').val($('.default-sizes option:selected').data('s'))

    let s = $('.thumb-input-number-width input').val()
    let h = $('.thumb-input-number-height input').val()

    $('.order-btn.add_to-cart').attr('data-color',$('.colors option:selected').attr('data-color'))
    $('.buyInOneClickBtn').attr('data-color',$('.colors option:selected').attr('data-color'))

    reCalculateProduct(s, h, $(this).find(':selected').data('product_id'),null,null,null,null,null,null,$('.colors option:selected').attr('data-color'),null)
})



$(document).on('click', '.change-size', function(){
    let product_id = $(this).closest('.thumb-input-number').find('input').attr("data-product_id");
    let colors = $('.colors option:selected').attr('data-color')
    let s = $(".change-width").val();
    let h = $(".change-height").val();
    let l = $(".change-l").val();
    let l1 = $(".change-l1").val();
    let l2 = $(".change-l2").val();
    let m = $(".change-m").val();
    let d = $(".change-d").val();
    let b1 = $(".change-b1").val();
    let b2 = $(".change-b2").val();

    let paramsObj = checkSH(s,h,l,l1,l2,m,d,b1,b2)
    if(paramsObj.s) s =  paramsObj.s
    if(paramsObj.h) h =  paramsObj.h
    if(paramsObj.l) l =  paramsObj.l
    if(paramsObj.l1) l1 =  paramsObj.l1
    if(paramsObj.l2) l2 =  paramsObj.l2
    if(paramsObj.m) m =  paramsObj.m
    if(paramsObj.d) d =  paramsObj.d
    if(paramsObj.b1) b1 =  paramsObj.b1
    if(paramsObj.b2) b2 =  paramsObj.b2
    reCalculateProduct(s, h, product_id, l, l1, l2, m, d, null, colors, b1, b2)
})




$(document).on('change', '.change-height', function() {
    let numberToCeilDigit = $(this).val()
    $(this).val(numberToCeilDigit) 
    if(+$(this).val()>+$(this).attr('max')){
        $(this).val($(this).attr('max'))
    }
    else if (+$(this).val()<+$(this).attr('min')){
        $(this).val($(this).attr('min'))
    }
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
    $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})
$(document).on('change', '.change-width', function() {
    let numberToCeilDigit = $(this).val()
    $(this).val(numberToCeilDigit) 
    if(+$(this).val()>+$(this).attr('max')){
        $(this).val($(this).attr('max'))
    }
    else if (+$(this).val()<+$(this).attr('min')){
        $(this).val($(this).attr('min'))
    }
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
    $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})

$(document).on('change', '.change-l', function() {
    let numberToCeilDigit = $(this).val()
    $(this).val(numberToCeilDigit) 
    if(+$(this).val()>+$(this).attr('max')){
        $(this).val($(this).attr('max'))
    }
    else if (+$(this).val()<+$(this).attr('min')){
        $(this).val($(this).attr('min'))
    }
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
    $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})

$(document).on('change', '.change-l1', function() {
    let numberToCeilDigit = $(this).val()
    $(this).val(numberToCeilDigit) 
    if(+$(this).val()>+$(this).attr('max')){
        $(this).val($(this).attr('max'))
    }
    else if (+$(this).val()<+$(this).attr('min')){
        $(this).val($(this).attr('min'))
    }
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
    $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})
$(document).on('change', '.change-l2', function() {
    let numberToCeilDigit = $(this).val()
    $(this).val(numberToCeilDigit) 
    if(+$(this).val()>+$(this).attr('max')){
        $(this).val($(this).attr('max'))
    }
    else if (+$(this).val()<+$(this).attr('min')){
        $(this).val($(this).attr('min'))
    }
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
    $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})
$(document).on('change', '.change-m', function() {
    let numberToCeilDigit = $(this).val()
    $(this).val(numberToCeilDigit) 
    if(+$(this).val()>+$(this).attr('max')){
        $(this).val($(this).attr('max'))
    }
    else if (+$(this).val()<+$(this).attr('min')){
        $(this).val($(this).attr('min'))
    }
    reCalculateProduct($('.change-width').val(), $('.change-height').val(), $('.change-height').data("product_id"),
    $('.change-l').val(), $('.change-l1').val(), $('.change-l2').val(), $('.change-m').val(), $('.change-d').val(),null,$('.colors option:selected').attr('data-color'),$('.change-b1').val(), $('.change-b2').val())
})


$('.variations-select').change(function(){
    reCalculateProduct(null, null, $(this).find(':selected').data('product-id'), null, null, null, null, null,$(this).find(':selected').data('variation-id'))
    $('.order-btn.add_to-cart').attr('data-variation_id',$(this).find(':selected').data('variation-id'))
    $('.buyInOneClickBtn').attr('data-variation_id',$(this).find(':selected').data('variation-id'))
})


$(document).on('click', '.copy-sku',function(){
    $(this).siblings('input.skuToCopy').select();      
    document.execCommand("copy");
})




if (document.querySelector(".buyInOneClickBtn")) {
    document.querySelector(".buyInOneClickBtn").onclick = function() {
        document.querySelector('.sendBuyInOneClick').dataset.product_id = this.dataset.product_id
        document.querySelector('.sendBuyInOneClick').dataset.product_count = $('.prod_quantity input').val()
        if(this.dataset.product_s) document.querySelector('.sendBuyInOneClick').dataset.product_s = this.dataset.product_s
        if(this.dataset.product_h) document.querySelector('.sendBuyInOneClick').dataset.product_h = this.dataset.product_h

        if(this.dataset.product_l) document.querySelector('.sendBuyInOneClick').dataset.product_l = this.dataset.product_l
        if(this.dataset.product_l1) document.querySelector('.sendBuyInOneClick').dataset.product_l1 = this.dataset.product_l1
        if(this.dataset.product_l2) document.querySelector('.sendBuyInOneClick').dataset.product_l2 = this.dataset.product_l2
        if(this.dataset.product_m) document.querySelector('.sendBuyInOneClick').dataset.product_m = this.dataset.product_m
        if(this.dataset.product_d) document.querySelector('.sendBuyInOneClick').dataset.product_d = this.dataset.product_d

        if(this.dataset.product_b1) document.querySelector('.sendBuyInOneClick').dataset.product_b1 = this.dataset.product_b1
        if(this.dataset.product_b2) document.querySelector('.sendBuyInOneClick').dataset.product_b2 = this.dataset.product_b2

        if(this.dataset.variation_id) document.querySelector('.sendBuyInOneClick').dataset.variation_id = this.dataset.variation_id
        if(this.dataset.color) document.querySelector('.sendBuyInOneClick').dataset.color = this.dataset.color

        if(this.dataset.add_chars) document.querySelector('.buyInOneClickBtn').dataset.add_chars = this.dataset.add_chars

        $('.buyInOneClickBtn').attr('data-color',$('.colors option:selected').attr('data-color'))

        document.querySelector('.sendBuyInOneClick').dataset.form_id = this.dataset.form_id
    }
    document.querySelector('.sendBuyInOneClick').onclick = function(e) {
        if (document.querySelector(".form-popup-error-field")) document.querySelector(".form-popup-error-field").remove();
        let block = $('.last-div-in-oneClickBuy')
        e.preventDefault()
        let arr = []
        if($(this).data("color")){
            let attrs = $(this).data("color")
            arr.push(attrs)
        } 
        $.ajax({
            type: "post",
            url: '/client/buyOnClick',
            data: {
                "name": $('.oneClickBuy-name-field').val(),
                "phone": $('.oneClickBuy-phone-field').val(),
                "form_id": $(this).data("form_id"),
                "count": $(this).data("product_count"),
                "product_id": $(this).data("product_id"),
                "custom_s": $(this).data("product_s"),
                "custom_h": $(this).data("product_h"),
                "custom_l": $(this).data("product_l"),
                "custom_l1": $(this).data("product_l1"),
                "custom_l2": $(this).data("product_l2"),
                "custom_m": $(this).data("product_m"),
                "custom_d": $(this).data("product_d"),
                "variation_id": $(this).data("variation_id"),
                "default_atr": arr && arr.length ? arr : null,
                "custom_b1": $(this).data("product_b1"),
                "custom_b2": $(this).data("product_b2"),
                "add_chars": $(this).data("add_chars"),
            },
            dataType: 'JSON',
            success: function(data) {
                window.dataLayer.push({'event': 'consultation_form_submit'});
                _functions.openPopup(`.popup-content[data-rel="12"]`);
                document.querySelector(".oneClickBuyForm").reset();
            },
            error: function(data) {
                block.after(`<div class="form-popup-error-field">${data.responseJSON.message}</div>`)
                console.warn(data)
            }
        }).done(function() {
            // hide spinner
            $('#loading').hide();
        });
        return false
    }
}

if (document.querySelector(".informAvialibilityBtn")) {
    document.querySelector(".informAvialibilityBtn").onclick = function() {
        document.querySelector('.informAvialibility-send-btn').dataset.product_id = this.dataset.product_id
    }

    document.querySelector('.informAvialibility-send-btn').onclick = function(e) {
        if (document.querySelector(".form-popup-error-field")) document.querySelector(".form-popup-error-field").remove();
        if (document.querySelector(".form-popup-success-field")) document.querySelector(".form-popup-success-field").remove();
        let block = $('.informAvialibility-last-block')
        e.preventDefault()
        $.ajax({
            type: "post",
            url: '/product/informUser',
            data: {
                "name": $('.informAvialibility-name-field').val(),
                "email": $('.informAvialibility-email-field').val(),
                "product_id": $(this).data("product_id"),
            },
            dataType: 'JSON',
            success: function(data) {
                block.after(`<div class="form-popup-success-field">${data.message}</div>`)
            },
            error: function(data) {
                block.after(`<div class="form-popup-error-field">${data.responseJSON.message}</div>`)
            }
        }).done(function() {
            // hide spinner
            $('#loading').hide();
        });
        return false
    }
}

function checkSH(s,h,l,l1,l2,m,d,b1,b2) {
    if(s) s = Math.ceil(s);
    if(h) h = Math.ceil(h);
    if(l) l = Math.ceil(l);
    if(l1) l1 = Math.ceil(l1);
    if(l2) l2 = Math.ceil(l2);
    if(m) m = Math.ceil(m);
    if(d) d = Math.ceil(d);
    if(b1) b1 = Math.ceil(b1);
    if(b2) b2 = Math.ceil(b2);
    let paramsObj = {
        s: null,
        h: null,
        l: null,
        l1: null,
        l2: null,
        m: null,
        d: null,
        b1: null,
        b2: null
    }

    let argsNames = ['s','h','l','l1','l2','m','d','b1','b2'];
    let args = [...arguments];
    let arr = [];
    
    function checkParams(name, val) {
        if(val){
            let min = $(`input[name=${name}]`).attr('min');
            let max = $(`input[name=${name}]`).attr('max');
            if(+val <= +min) val = min;
            if(+val >= +max) val = max;
            $(`input[name=${name}]`).val(val);
            paramsObj[name] = +val
        }
    }
    if(args && args.length){
        for (let i = 0; i < argsNames.length; i++) {
            arr.push({
                name: argsNames[i],
                value: args[i],
            })
        }
        for (const i of arr) {
            checkParams(i.name, i.value);
        }
    }
    return paramsObj
}

let parmName = ['s','h','l','l1','l2','m','d','b1','b2'];
$(document).on("input", "input", function () {
    if($(this).closest('.oneClickBuyForm').length) return false
    let name = $(this).attr('name');
    let product_id = $(this).attr("data-product_id");
    let min = +$(this).attr("min");
    let max = +$(this).attr("max");
    if(name && parmName.includes(name)){
        
        let input = $(this);
        var handle = input.data("handle");
        if (handle) {
            clearTimeout(handle);
        }

        handle = setTimeout(function() {
            let value = input.val();
            value = Number(value)
            if(value <= min) value = min;
            if(value >= max) value = max;
            input.val(value);
            if($("input[name=choose-size]").is(':checked')){
                let s = $("input[name=s]").val();
                let h = $("input[name=h]").val();
                if(s && h){
                    checkSH(s,h)
                    reCalculateProduct($("input[name=s]").val(), $("input[name=h]").val(), product_id,$("input[name=l]").val(), $("input[name=l1]").val(), $("input[name=l2]").val(), $("input[name=m]").val(), $("input[name=d]").val(),null,$('.colors option:selected').attr('data-color'),$("input[name=b1]").val(),$("input[name=b2]").val())
                }
            }else{
                let s = $("input[name=s]").val();
                let h = $("input[name=h]").val();
                let l = $("input[name=l]").val();
                let l1 = $("input[name=l1]").val();
                let l2 = $("input[name=l2]").val();
                let m = $("input[name=m]").val();
                let d = $("input[name=d]").val();
                let b1 = $("input[name=b1]").val();
                let b2 = $("input[name=b2]").val();
                checkSH(s,h,l,l1,l2,m,d,b1,b2)
                reCalculateProduct($("input[name=s]").val(), $("input[name=h]").val(), product_id, $("input[name=l]").val(), $("input[name=l1]").val(), $("input[name=l2]").val(), $("input[name=m]").val(), $("input[name=d]").val(),null,$('.colors option:selected').attr('data-color'),$("input[name=b1]").val(),$("input[name=b2]").val())  
            }

            input.data("handle", 0);
        }, 2000);
        input.data("handle", handle); 
    }
})


$(document).on('input','.change-add-chars',function(){
    let input = $(this);
    let min = +$(this).attr("min");
    let max = +$(this).attr("max");
    let product_id = $(this).attr("data-product_id");
    var handle = input.data("handle");
    if (handle) {
        clearTimeout(handle);
    }

    handle = setTimeout(function() {
        let value = input.val();
        value = Number(value)
        if(value <= min) value = min;
        if(value >= max) value = max;
        input.val(value);
        reCalculateProduct($("input[name=s]").val(), $("input[name=h]").val(), product_id, $("input[name=l]").val(), $("input[name=l1]").val(), $("input[name=l2]").val(), $("input[name=m]").val(), $("input[name=d]").val(),null,$('.colors option:selected').attr('data-color'),$("input[name=b1]").val(),$("input[name=b2]").val())  

        input.data("handle", 0);
    }, 2000);
    input.data("handle", handle); 
   
})
$(document).on('click','.change-add-chars',function(){
    reCalculateProduct($("input[name=s]").val(), $("input[name=h]").val(), $(this).attr('data-product_id'), $("input[name=l]").val(), $("input[name=l1]").val(), $("input[name=l2]").val(), $("input[name=m]").val(), $("input[name=d]").val(),null,$('.colors option:selected').attr('data-color'),$("input[name=b1]").val(),$("input[name=b2]").val())  
})


// SAVE PRODUCT REWIEWS 
    
$(document).on('submit', '#product_review', function () {
    $(this).find('button[type="submit"]').attr('disabled', true);
    let values = $('#product_review *[name]');
    let data = {};
    values.each((index, el) => {
        if (($(el).attr('type') == "radio" || $(el).attr('type') == "checkbox") && $(el).is(':checked')) {
            data[$(el).attr('name')] = $(el).val();
        } else if ($(el).attr('type') == "text" || $(el).attr('type') == "email" || $(el).is("textarea") || $(el).is('select') == true) {
            data[$(el).attr('name')] = $(el).val();
        }
    });
    data['product_id'] = $('#product_review').attr('data-product_id');
    data['parent_id'] = "0";
    data['rating'] = data['rating-0'] ? data['rating-0'] : "5";
    data['lang']= $('body').data("lang");
    const url = $(this).attr('action');
    $('#loading').show(data);
    $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function(data) {
                if (data.html) {
                    if(!$('.review-empty').hasClass('d-none')){
                        $('.review-empty').addClass('d-none');
                        $('.feedback-list').append(data.html);
                    }else{
                        $('.review-item:first').before(data.html);
                    }
                };
                if (data.message) {
                    _functions.openPopup(`.popup-content[data-rel="10"]`);
                };
                $('#product_review').find('input').val('');
                $('#product_review').find('textarea').val('');
            },
            error: function(data) {
                $('#product_review_res').text(data.responseJSON.message);
            }
        }).done(function() {
            // hide spinner
            // $('#loading').hide();
            $('#product_review').find('button[type="submit"]').attr('disabled', false);
        })
        .fail(function() {
            // $('#loading').hide();
            $('#product_review').find('button[type="submit"]').attr('disabled', false);
        });

    return false
});

// HIDE FORM COMMENT

$(document).on('click', '.cancel-form-btn', function () {
    $('.review-bottom-form').hide();
});

// SAVE PRODUCT REWIEWS COMMENT

$(document).on('submit', 'form.text-right', function () {
    $(this).find('button[type="submit"]').attr('disabled', true);
    let values = $('form.text-right *[name]');
    console.log(this);
    let data = {};
    data['name'] = $(this).find('input[name="name"]').val();
    data['email'] = $(this).find('input[name="email"]').val();
    data['text'] = $(this).find('textarea[name="text"]').val();
    data['product_id'] = $(this).attr('data-product_id');
    data['parent_id'] = $(this).attr('data-parent_id');
    const url = $(this).attr('action');
    const answersCount = $(this).closest('.review-item').find('.review-count b').text();
    data['lang']= $('body').data("lang");


    $.ajax({
        type: "post",
        context: this,
        url: url,
        data: data,
        success: function (data) {
            if (data.html) {
                $(this).closest('.review-bottom-form').after(data.html);
                $(this).closest('.review-item').find('.review-count b').text(Number(answersCount) + 1);
                $(this).closest('.review-bottom-form').hide();
            };
            if (data.message) {
                _functions.openPopup(`.popup-content[data-rel="10"]`);
                $('.review-bottom-form').hide();
            };
            $('form.text-right').find('input').val('');
            $('form.text-right').find('textarea').val('');
        },
        error: function (data) {
            $('.review_comment_res').text(data.responseJSON.message);
        }
    }).done(function () {
        $(this).find('button[type="submit"]').attr('disabled', false);
    })
    .fail(function () {
        $(this).find('button[type="submit"]').attr('disabled', false);
    });
    return false
});

// SHOW MORE REWIEWS 

$(document).on('click', '.btn.load-more', function () {
    let data = {};
    let page = $(this).attr('data-page')
    data['page'] = ++page;
    data['product_id'] = $(this).attr('data-product_id');
    $.ajax({
            type: "post",
            url: '/showMoreProductReview',
            data: data,
            context: this,
            success: function(data) {
                if (data.html) {
                    $('.review-item:last').after(data.html);
                    $(this).attr('data-page', page);
                };
                if (!data.isShowMore)  $(this).remove();
                
            },
            error: function(data) {
                $('#product_review_res').text(data.responseJSON.message);
            }
        }).done(function() {
            // hide spinner
            // $('#loading').hide();
            
        })
        .fail(function() {
            
        });

    return false
});

// TOGETHER CHEAPER 

$(document).on("change", ".checkbox-entry-wrap input[name=do-no-add]", function () {
    let allProductPriceOld = $('#all-product_price-old').attr('data-all_product_price-old');
    allProductPriceOld = allProductPriceOld ? Number(allProductPriceOld) : 0;
    let allProductPrice = $('#all-product_price').attr('data-all_product_price');
    allProductPrice = allProductPrice ? Number(allProductPrice) : 0;
    let productPriceOld = $('.cheaper-prod .swiper-slide-active').find('.product_price-old').attr('data-price');
    productPriceOld = productPriceOld ? Number(productPriceOld) : 0;
    let productPrice = $('.cheaper-prod .swiper-slide-active').find('.product_price').attr('data-price');
    productPrice = productPrice ? Number(productPrice) : 0;
    let newAllProductPriceOld;
    let newAllProductPrice;
    if ($(this).is(':checked')) {
        newAllProductPriceOld = allProductPriceOld - productPriceOld;
        newAllProductPrice = allProductPrice - productPrice;
    } else {
        newAllProductPriceOld = allProductPriceOld + productPriceOld;
        newAllProductPrice = allProductPrice + productPrice;
    }
    $('#all-product_price-old').attr('data-all_product_price-old', newAllProductPriceOld);
    $('#all-product_price').attr('data-all_product_price', newAllProductPrice);
    $('#all-product_price-old').find('b').text(newAllProductPriceOld);
    $('#all-product_price').find('b').text(newAllProductPrice);
})
function togetherCheaper() {
    if (!$('.checkbox-entry-wrap input[type=checkbox]').is(':checked')) {
    let product1PriceOld = $('#cheaper-prod-main').find('.product_price-old b').text();
    let product1Price = $('#cheaper-prod-main').find('.product_price b').text();
    product1Price = product1Price ? Number(product1Price) : 0;
    product1PriceOld = product1PriceOld ? Number(product1PriceOld) : product1Price;

    let product2PriceOld = $('#cheaper-prod-second').find('.product_price-old b').text();
    let product2Price = $('#cheaper-prod-second').find('.product_price b').text();
    product2Price = product2Price ? Number(product2Price) : 0;
    product2PriceOld = product2PriceOld ? Number(product2PriceOld) : product2PriceOld;

    let product3PriceOld = $('.cheaper-prod .swiper-slide-active').find('.product_price-old').attr('data-price');
    let product3Price = $('.cheaper-prod .swiper-slide-active').find('.product_price').attr('data-price');
    product3Price = product3Price ? Number(product3Price) : 0;
    product3PriceOld = product3PriceOld ? Number(product3PriceOld) : product3Price;

    let newAllProductPriceOld = product1PriceOld + product2PriceOld + product3PriceOld;
    let newAllProductPrice = product1Price + product2Price + product3Price;

    $('#all-product_price-old').attr('data-all_product_price-old', newAllProductPriceOld);
    $('#all-product_price').attr('data-all_product_price', newAllProductPrice);
    $('#all-product_price-old').find('b').text(newAllProductPriceOld);
    $('#all-product_price').find('b').text(newAllProductPrice);
    }
}
$(document).on("click", ".swiper-button-prev", function () {
    togetherCheaper();
})
$(document).on("click", ".swiper-button-next", function () {
    togetherCheaper();
})

$('.swiper-entry.products_swiper_mini').each(function () {
    var $this = $(this),
        $thisSwiper = $this.find('.swiper-container')[0].swiper;

    $thisSwiper.on('slideChange', function () {
        togetherCheaper();
    });
});
$(document).on("click", ".open-popup-config", function (e) {
    let data ={};
    data.id = $(this).attr('data-atr-gr-id');
    data.product_id = $(this).attr('data-product_id');
    data.lang = $('body').data("lang");
    
    $.ajax({
        type: "post",
        context: this,
        url: '/configuratorPopup',
        data: data,
        success: function (data) {
            if (data.html) $('.popup-content[data-rel="' + $(this).data('rel') + '"]').html(data.html);
            e.preventDefault();
            _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
        },
        error: function (data) {
           
        }
    })
})
})