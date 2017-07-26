function debounce(func, wait, immediate) { var timeout; return function () { var context = this, args = arguments; var later = function () { timeout = null; if (!immediate) func.apply(context, args); }; var callNow = immediate && !timeout; clearTimeout(timeout); timeout = setTimeout(later, wait); if (callNow) func.apply(context, args); }; };

(function ($) {

    $(document).on('ready', function () {
        $('.news-slider').slick({
            slide: '.news-slider__item',
            // autoPlay:false,
            fade: true,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
        });

        $('.why-slider').slick({
            //slide: '.why-slider__item',
            // autoPlay:false,
            fade: true,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
        });

        $('.three-slides').slick({
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
        });

        $('.house-slider__for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            infinite: false,
            asNavFor: '.house-slider__nav'
        });
        $('.house-slider__nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.house-slider__for',
            dots: false,
            arrows: true,
            // centerMode: true,
            focusOnSelect: true,
            infinite: false
        });

        /***************************************************************/
        //filters
        /***************************************************************/
        //range price
        $( ".range-price" ).slider({
            range: true,
            min: 15,
            max: 100,
            values: [ 35, 78 ],
            slide: function( event, ui ) {
                $(this).prev().val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + ' тис. грн' );
            }
        });
        $( ".price" ).val( $( ".range-price" ).slider( "values", 0 ) +
            " - " + $( ".range-price" ).slider( "values", 1 ) + ' тис. грн' );

        //range area
        $( ".range-area" ).slider({
            range: true,
            min: 10,
            max: 300,
            values: [ 45, 300 ],
            slide: function( event, ui ) {
                $(this).prev().val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + " м" );
            }
        });
        $( ".area" ).val( $( ".range-area" ).slider( "values", 0 ) +
            " - " + $( ".range-area" ).slider( "values", 1 ) + " м" );

        //range floor
        $( ".range-floor" ).slider({
            range: true,
            min: 1,
            max: 20,
            values: [ 7, 18 ],
            slide: function( event, ui ) {
                $(this).prev().val( ui.values[ 0 ] + " - " + ui.values[ 1 ]);
            }
        });
        $( ".floor" ).val( $( ".range-floor" ).slider( "values", 0 ) +
            " - " + $( ".range-floor" ).slider( "values", 1 ) );

        //open all filters
        $('.select-flat-form__more-option').on('click', function (e) {
            e.preventDefault();
            $(this).addClass('hidden').parents('.select-flat__row').siblings('.select-flat__row').removeClass('full-options');
        });

        //select floor
        $('.planning-settings__arrow-left').on('click', function(event){
            if( +$(this).next().text() <= 1 ){
                event.preventDefault()
            }else{
                $(this).next().text(+$(this).next().text() - 1)
            }
        });
        $('.planning-settings__arrow-right').on('click', function(){
            $(this).prev().text(+$(this).prev().text() + 1)
        });

        /***************************************************************/
        //select menu
        /***************************************************************/
        $(".select-house").selectmenu();
        $(".select-section").selectmenu();


        /***************************************************************/
        //popups
        /***************************************************************/
        $('#callback-popup, #review-popup, #video-popup, #reserv-popup').popup({
            transition: 'all 0.3s',
            onopen: function() {
                $('body').addClass('over-hidden');
            },
            onclose: function() {
                $('body').removeClass('over-hidden');

                //document.getElementById('video-popup-iframe').postMessage('{"event":"command","func":"' + pauseVideo + '","args":""}','*');
                //.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });

        //masked phone
        $('.js-phone-mask').mask('+38 (000) 000-00-00',{
            translation: {
                // 'r': {
                //     pattern: /[\/]/,
                //     fallback: '/'
                // },
                placeholder: "+38 (___) ___-__-__"
            }
        });

        //timepicker
        $('#review-time').timepicker({
            'step': 15,
            'timeFormat': 'H:i',
            'disableTimeRanges': [
                ['13:00', '14:00']
            ],
            'minTime': '10:00am',
            'maxTime': '18:00pm',
        });

        $('#review-time').on('focus', function () {
            $(this).parent('.review-form__timepicker-wrap').addClass('open')
        }).on('blur', function () {
            $(this).parent('.review-form__timepicker-wrap').removeClass('open')
        });

        /***************************************************************/
        //tabs
        /***************************************************************/
        $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').fadeOut("fast").removeClass('active').eq($(this).index()).fadeIn("slow").addClass('active');
        });

        //single accordion
        $('.commerce__title-block').on('click', function (e) {
            $(this).find('.commerce__title-icon').toggleClass('open');
            $(this).siblings('.commerce__filter-wrap').stop().slideToggle();

        })

        /***************************************************************/
        //
        /***************************************************************/
        //up page
        $('.footer__link-up').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 700);
        });

        //center img
        $('.js-img-center').imgCentering({
            forceSmart:true
        });

        //fixed callback icon
        if($('*').is('.callback-button')){
            window.addEventListener('scroll', Ascroll, false);
            document.body.addEventListener('scroll', Ascroll, false);
            Ascroll();
        }
        function Ascroll() {
            var winHeight = $( window ).height() - 100;
            var a = document.querySelector('.callback-button'), b = null, P = winHeight;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
            if (b == null) {
                var Sa = getComputedStyle(a, ''), s = '';
                for (var i = 0; i < Sa.length; i++) {
                    if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                    }
                }
                b = document.createElement('div');
                b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                a.insertBefore(b, a.firstChild);
                var l = a.childNodes.length;
                for (var i = 1; i < l; i++) {
                    b.appendChild(a.childNodes[1]);
                }
                a.style.height = b.getBoundingClientRect().height + 'px';
                a.style.padding = '0';
                a.style.border = '0';
            }

            var Ra = a.getBoundingClientRect(),
                R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.follow').getBoundingClientRect().top - 200);

            if ((Ra.top - P) <= 0) {
                if ((Ra.top - P) <= R) {
                    b.className = 'stop';
                    b.style.top = - R +'px';
                } else {
                    b.className = 'sticky';
                    b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            window.addEventListener('resize', function() {
                a.children[0].style.width = getComputedStyle(a, '').width
            }, false);
        }


    });
})(jQuery);
