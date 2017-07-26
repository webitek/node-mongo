// #review-time, input#review-email,
$('input#review-name, input#review-phone, input#callback-name, input#callback-phone, input#reserv-name, input#reserv-phone, input#reserv-email, input#ask-name, input#ask-email, #ask-text').unbind().blur( function(){
    var id = $(this).attr('id'),
        val = $(this).val(),
        count = 0;

    switch(id){
        case 'review-name':
        case 'callback-name':
        case 'reserv-name':
        case 'ask-name':
            var rv_name = /^[a-zA-Zа-яА-Я]+$/;
            if(val.length > 1 && val != '' && rv_name.test(val)){
                $(this).addClass('not_error').removeClass('error');
            }else{
                $(this).removeClass('not_error').addClass('error');
            }
            break;
        case 'review-phone':
        case 'callback-phone':
        case 'reserv-phone':
            if(val != '' && val.length >=19 ){
                $(this).addClass('not_error').removeClass('error');
            }else{
                $(this).removeClass('not_error').addClass('error');
            }
            break;

        // case 'review-time':
        //     if(val != ''){
        //         $(this).addClass('not_error').removeClass('error');
        //     }else
        //     {
        //         $(this).removeClass('not_error').addClass('error');
        //     }
        //     break;

        case 'ask-text':
            if(val != '' && val.length >=10 ){
                $(this).addClass('not_error').removeClass('error');
            }else{
                $(this).removeClass('not_error').addClass('error');
            }
            break;
        case 'ask-email':
            var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            if(val != '' && rv_email.test(val)){
                $(this).addClass('not_error').removeClass('error');
            }else
            {
                $(this).removeClass('not_error').addClass('error');
            }
            break;
    }
});

$('form.callback-form').submit(function(e){
    e.preventDefault();
    var $form = $(this);

    submitValidate($form, 2, 'callback-popup');
});


$('form.review-form').submit(function(e){
    e.preventDefault();
    var $form = $(this);

    submitValidate($form, 2, 'review-popup');
});

$('form.reserv-form').submit(function(e){
    e.preventDefault();
    var $form = $(this);

    submitValidate($form, 2, 'reserv-popup');
});

$('form.form-ask').submit(function(e){
    e.preventDefault();
    var $form = $(this);

    submitValidate($form, 3);
});

function submitValidate(form, required, popup) {
    if($('.'+ form[0].className +' .not_error').length == required){
        $.ajax({
            url: '../send.php',
            type: 'post',
            data: $(this).serialize(),
            beforeSend: function(xhr, textStatus){
                form.find('[type="submit"]').attr('disabled','disabled');
            },
            success: function(response){
                // form.find('[type="text"], textarea').val('');
                form.find('[type="submit"]').removeAttr('disabled');
                // form.append('<span class="response-text">' + response + '</span>');
                // $('label').removeClass('focus');
            }
        });
        setTimeout(function () {
            $('#' + popup).popup('hide');
        }, 1000)
    } else {
        form.find('input.required, textarea.required').not($('.not_error')).addClass('error');
        return false;
    }
}



