$(document).ready(function () {
    "use strict";
    $('.container-active').show();
    $('.container').hide();
    
    $('.navIcon').click(function () { 
        var panel = $(this).attr('data-container');
        var sub = $(this).attr('data-message').toUpperCase();
        
        $('.container-active').hide();
        $('.container-active').addClass('container');
        $('.container-active').removeClass('container-active');
        $('#subtitle').text(sub);
        $("#" + panel).addClass('container-active');
        $('.container-active').show();
    })
});