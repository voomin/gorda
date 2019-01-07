$(document).ready(function(){
    $("input[name='id']").change(function(){
        $.ajax({
            type: "POST",
            url: "idCheck",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "id":$(this).val(),
            },
            success: function(args) {          
                idCheck = JSON.parse(args);
                var status=(idCheck)
                ?"ID가 존재 하지 않습니다."
                :"Gorda";
                $("form p").html(status);
            },
            error: function(jqXHR, textstatus, errorThrown) {
                //console.log("서버와 연결이 되지 않습니다.");
                console.log('text status ' + textstatus + ', err ' + errorThrown);
            }
        });
    });
    $("input[type='button']").click(function(){
        success();
    });
});