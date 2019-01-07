$(document).ready(function(){
    $('.shop').click(function() {
        location.href = "/shop="+$(this).attr('id');
    });
});