
$(document).ready(function(){
    $('button').click(function() {
        var name=$('.name').val();
        $('button').html('수정중...');
        if(name!="")
            $.ajax({
                type: "POST",
                url: "profileUpdate",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    name:$('.name').val(),
                    nick_name:$('.nick_name').val(),
                    tel:$('.tel').val(),
                    jender:$('.jender').val(),
                    birthday:$('.birthday').val()
                },
                success: function(name) {  
                    console.log(name);
                    $('.my').html(name);
                    $('button').html('수정하기');
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    console.log('text status ' + textstatus + ', err ' + errorThrown);
                    $('button').html('수정하기');
                }
            });
        else
            $('.name').val(before_name);
    });
});