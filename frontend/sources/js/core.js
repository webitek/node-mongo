(function ($) {

    $(document).on('ready', function () {
        $('.welcome-slider').slick({
            dots: false,
            arrows: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                }
            ]
        });

        $('.news-form__email').unbind().blur( function(){
            var id = $(this).attr('id');
            var val = $(this).val();
            var label = $('.news-form__email-label');

            var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            if(val != '' && rv_email.test(val)){
                $(this).addClass('not_error').removeClass('error');
                label.text(' ');
            }else{
                $(this).removeClass('not_error').addClass('error');
                label.text('Введіть валідний email');
            }
        });// end blur()
        $('form.news-form').submit(function(e){
            var label = $('.news-form__email-label');
            e.preventDefault();
            if($('.not_error').length == 1){
                $.ajax({
                    url: 'send.php',
                    type: 'post',
                    data: $(this).serialize(),
                    beforeSend: function(xhr, textStatus){
                        $('form.news-form').attr('disabled','disabled');
                        label.text('Дякуємо! Будемо надсилати вам новини.');
                    },
                    success: function(response){
                        $('form.news-form').removeAttr('disabled');
                        label.text('Дякуємо! Будемо надсилати вам новини.');
                    }
                }); // end ajax({...})
            }
            else
            {
                $('input.required').not($('.not_error')).addClass('error');
                if(!$('input.required').not($('.not_error'))){
                    console.log('not_error')
                }
                label.text('Введіть валідний email')

                return false;
            }
        })
    });

})(jQuery);
