var idCheck=false;
var pattern2 = /([^a-zA-Z0-9-_])/;
$(document).ready(function(){
    $('input').change(function(){
        success();
    });
    $("input[name='id']").change(function(){
        var id=$(this).val();
        if(pattern2.test(id)){
            alert("아이디는 영문, 숫자, -, _ 만 사용할 수 있습니다. ");
            $(this).val("");
        }else
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
                    ?"사용가능한 ID 입니다."
                    :"같은 ID가 존재 합니다.";
                    $("input[type='button']").val(status);
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

var nullcheck=function(obj){
    for(i in obj)
        if(""==obj[i]) 
            return false;
    return true;
}
var Check=function(){
    var status="가입하기";
    var result={}
    var obj={
        id:$("input[name='id']").val(),
        pwd:$("input[name='pwd']").val(),
        pwd2:$("input[name='pwd2']").val(),
        name:$("input[name='name']").val(),
    }
    result['id']={
        bool:idCheck,
        status:"같은 id가 존재합니다."
    }
    result['null']={
        bool:nullcheck(obj),
        status:'빈칸을 모두 작성 해주세요.'
    }
    result['pwd']={
        bool:(obj.pwd==obj.pwd2),
        status:'비밀번호가 같지 않습니다.'
    }
    for(i in result)
        if(!result[i].bool){
            status=result[i].status;
            $("input[type='button']").val(status);
            return false;
        }
    $("input[type='button']").val(status);
    return true;
}
function success(){
    if(Check()){
        $("input[type='button']").attr({type:'submit'});
    }else{
        $("input[type='submit']").attr({type:'button'});
    }
}