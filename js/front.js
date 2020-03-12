(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
        'gtm.start':
            new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-PNTSVK8');

$(document).ready(function () {

    var pathname = window.location.pathname;
    /* 
    $(document).on('view:HomePage', function () {
        console.info('View on HomePage tracked');
    });
    $(document).on('view:ProductPage', function () {
        console.info('View on ProductPage tracked');
    });
    $(document).on('view:Basket', function () {
        console.info('View on Basket tracked');
    });
    $(document).on('view:Checkout', function () {
        console.info('View on Checkout tracked');
    });
    $(document).on('view:Delivery', function () {
        console.info('View on Delivery tracked');
    });
    $(document).on('view:Payment', function () {
        console.info('View on Payment tracked');
    });
 
    // $(document).on('conversion', function(info){
    //     info.forEach(function(product){
    //         sendGAevent(product.name);
    //         sendGAevent(product.price);
    //     });
    // });
 
 
    if (pathname === '/index.html') {
        $(document).trigger('view:HomePage');
    }
    if (pathname === '/detail.html') {
        $(document).trigger('view:ProductPage');
    }
    if (pathname === '/basket.html') {
        $(document).trigger('view:Basket');
    }
    if (pathname === '/checkout1.html') {
        $(document).trigger('view:Checkout');
    }
    if (pathname === '/checkout2.html') {
        $(document).trigger('view:Delivery');
    }
    if (pathname === '/checkout3.html') {
        $(document).trigger('view:Payment');
    } */

    $('.box-footer [type="submit"]').click(function () {
        $(document).trigger('conversion'); // require conversion function (data analytics)
    })

    function getPageName() {
        var pathname = window.location.pathname;
        if (pathname === '/index.html') {
            return 'Homepage';
        } else if (pathname.indexOf('detail.html') > -1) {
            return 'ProductPage';
        } else if (pathname.indexOf('basket.html') > -1) {
            return 'Basket';
        } else if (pathname.indexOf('checkout1.html') > -1) {
            return 'Checkout';
        } else if (pathname.indexOf('checkout2.html') > -1) {
            return 'Delivery';
        } else if (pathname.indexOf('checkout3.html') > -1) {
            return 'Payment';
        } else if (pathname.indexOf('checkout4.html') > -1) {
            return 'Checkout4';
        } else {
            return '';
        }
    }

    function getProductInfo() {
        return {
            productName: $('#productMain h1.text-center').text(),
            productPrice: $('#productMain .price').text(),
            //productImage: $('img').attr('src')
        };
    }



    function getCartInfo() {

        var productInfoEls = $('#checkout tbale tbody tr');
        var result = {};

        result.totalPurchase = $('#checkout table tbody tr').eq(1).text();
        result.userAgent = userAgent;
        result.productList = [];

        $each(productInfoEls, function (index, el) {
            result.productList.push({
                productName: $(el).children().eq(1).text(),
                productPrice: $(el).children().eq(2).text(),
                quantity: $(el).children().eq(3).text(),
                discount: $(el).children().eq(4).text(),
                totalPrice: $(el).children().eq(5).text()
            });
        });
        return result;
        /* var _products = [];

        document.querySelectorAll('tr').forEach(function (product) {
            var _name = product.childNodes()[0];
            _products.push(product)
        });
        return {
            totalPrice: '',
            products: _products
        }; */
    }

    function getParam() {
        var pageName = getPageName();
        var result = null;

        if (pathname === 'ProductPage') {
            //result = {};
            result = getProductInfo();
            // result.productName = $('#productMain h1.text-center').text();
            // result.productPrice = $('#productMain .price').text();
            return result;
        } else if (pageName === 'Checkout4') {
            // get order information, add found information to the result
            result = getCartInfo();
            return result;
        }
        return result;
    }

    function triggerPageEvent() {
        var pageName = getPageName();
        var params = getParam();

        if (pageName === 'Checkout4') {
            // specific event listener for checkout 4 page
            $('#checkout button').on('click', function () {
                $(document).trigger('conversion', params);
            });
        } else {
            $(document).trigger('view:' + pageName, params);
        }
    }

    $(document).on('view:ProductPage', function (event, params) {
        console.log('The first parameter that I receive is: ');
        console.log(event);
        console.log('The first parameter that I receive is: ');
        console.log(params);

        /*  GainNode('send', 'ProductPage', 'View', params.productName, {
             nonInetractions: true
         }); */
    });

    triggerPageEvent();


    $('.shop-detail-carousel').owlCarousel({
        items: 1,
        thumbs: true,
        nav: false,
        dots: false,
        loop: true,
        autoplay: true,
        thumbsPrerendered: true
    });


    $('#main-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400
    });


    $('#get-inspired').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400
    });


    $('.product-slider').owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        responsive: {
            480: {
                items: 1
            },
            765: {
                items: 2
            },
            991: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });





    // productDetailGallery(4000);
    utils();

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });





    $(window).on('load', function () {
        $(this).alignElementsSameHeight();
    });

    $(window).resize(function () {
        setTimeout(function () {
            $(this).alignElementsSameHeight();
        }, 150);
    });


    /* product detail gallery */

    // function productDetailGallery(confDetailSwitch) {
    //     $('.thumb:first').addClass('active');
    //     timer = setInterval(autoSwitch, confDetailSwitch);
    //     $(".thumb").click(function(e) {
    //
    // 	switchImage($(this));
    // 	clearInterval(timer);
    // 	timer = setInterval(autoSwitch, confDetailSwitch);
    // 	e.preventDefault();
    //     }
    //     );
    //     $('#mainImage').hover(function() {
    // 	clearInterval(timer);
    //     }, function() {
    // 	timer = setInterval(autoSwitch, confDetailSwitch);
    //     });
    //
    //     function autoSwitch() {
    // 	var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb');
    // 	if (nextThumb.length == 0) {
    // 	    nextThumb = $('.thumb:first');
    // 	}
    // 	switchImage(nextThumb);
    //     }
    //
    //     function switchImage(thumb) {
    //
    // 	$('.thumb').removeClass('active');
    // 	var bigUrl = thumb.attr('href');
    // 	thumb.addClass('active');
    // 	$('#mainImage img').attr('src', bigUrl);
    //     }
    // }

    function utils() {


        /* click on the box activates the radio */

        $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
            var radio = $(this).find(':radio');
            radio.prop('checked', true);
        });
        /* click on the box activates the link in it */

        $('.box.clickable').on('click', function (e) {

            window.location = $(this).find('a').attr('href');
        });
        /* external links in new window*/

        $('.external').on('click', function (e) {

            e.preventDefault();
            window.open($(this).attr("href"));
        });
        /* animated scrolling */

        $('.scroll-to, .scroll-to-top').click(function (event) {

            var full_url = this.href;
            var parts = full_url.split("#");
            if (parts.length > 1) {

                scrollTo(full_url);
                event.preventDefault();
            }
        });

        function scrollTo(full_url) {
            var parts = full_url.split("#");
            var trgt = parts[1];
            var target_offset = $("#" + trgt).offset();
            var target_top = target_offset.top - 100;
            if (target_top < 0) {
                target_top = 0;
            }

            $('html, body').animate({
                scrollTop: target_top
            }, 1000);
        }
    }


    $.fn.alignElementsSameHeight = function () {
        $('.same-height-row').each(function () {

            var maxHeight = 0;

            var children = $(this).find('.same-height');

            children.height('auto');

            if ($(document).width() > 768) {
                children.each(function () {
                    if ($(this).innerHeight() > maxHeight) {
                        maxHeight = $(this).innerHeight();
                    }
                });

                children.innerHeight(maxHeight);
            }

            maxHeight = 0;
            children = $(this).find('.same-height-always');

            children.height('auto');

            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });

            children.innerHeight(maxHeight);

        });


    }
})