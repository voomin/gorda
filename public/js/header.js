$(document).ready(function(){
    var name=$('.my a').html();
    if(name){
        $('.my a').remove();
        $('.my').html(name);
    }
    $(document).click(function() {
        $('.my_menu').hide();
    });
    $('.my').click(function(event){
        var w=$('.my_menu').width();
        var h=$('.my_menu').height();
        var x = event.pageX-w/2;
        var y = event.pageY+30; 
        $('.my_menu').css({top:y,left:x});
        $('.my_menu').show();
        event.stopPropagation();
    });
    $('.logo').click(function(){
        location.href="/";
    });
});