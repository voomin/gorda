var socket = io(); 
socket.on('cook',function(rcp){
    $(".state").html("요리 시작");
});
socket.on('complete',function(rcp){
    $(".state").html("요리 완료");
    alert("요리가 모두 완료 되었습니다 음식을 받아가세요.");
});
$(document).ready(function(){
    $(document).click(function() {
        $('.tab').hide();
    });
    $('.close').click(function() {
        window.history.back();
    });
    $(".sh").click(function() {
        var sid=$(this).attr('id');
        var o=shops[sid];//obj
        $('.tab .p1').html(o.sh_address);
        $('.tab .p2').html(o.sh_tel);
        $('.tab').show();
        event.stopPropagation();
    });
    $(".fd").click(function() {
        var fid=$(this).attr('id');
        var o=foods[fid];//obj
        $('.tab .p1').html(o.fd_name);
        $('.tab .p2').html(comma(o.fd_price));
        $('.tab').show();
        event.stopPropagation();
    });
    $("input[type='submit']").click(function() {
        var str="음식을 건네받으셨습니까?? "
        if(confirm(str)){
            $.ajax({
                type: "POST",
                url: "receiptConfirm",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function(args) {//args = tos={sid:order_id}
                    location.href='/';
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    alert('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
        }//if confirm
    });
});