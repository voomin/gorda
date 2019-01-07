var shops={};  
var socket = io(); //socket 어따 놓을지 생각하기
$(document).ready(function(){
    setting();
    nextChange();
    $(document).click(function() {
        $(".tab").hide();
    });
    $(".back").click(function() {
        history.back();
    });
    $(".addressInsert input").change(function(){//장소입력하기
        var str="<h3>장소</h3>"
        str+=$(".addressInsert input").val();
        $(".addr").html(str);
        $(".addr").show();
        $(".next1").remove();
        $(".next2").show();
    });
    $(".profileInsert input").change(function(){//장소입력하기
        //var str="<h3>장소</h3>"
        //str+=$(".addressInsert input").val();
        //$(".addr").html(str);
        //$(".addr").show();
        //$(".next1").remove();
        //$(".next2").show();
    });
    $(".shop, .addressInsert, .profileInsert").click(function() {
        event.stopPropagation();
    });
    $(".next1, .addr").click(function() {//next1 또는 주소란 누름
        $(".tab").hide();
        $(".addressInsert").show();
        event.stopPropagation();
    });
    $(".next2, .profile").click(function() {//next1 또는 주소란 누름
        $(".tab").hide();
        $(".profileInsert").show();
        event.stopPropagation();
    });
    $(".pay").click(function() {//결제하기 클릭
        $(".tab").hide();
        $(".paylist").show();
        event.stopPropagation();
    });
    $(".sh").click(function() {//가게코드 클릭
        $(".tab").hide();
        $(".shop").show();
        event.stopPropagation();
        var id=$(this).html();
        if(shops[id]){
            shopView(id);
        }else{
            console.log("서버로 요청 shop info // post");
            $.ajax({
                type: "POST",
                url: "shopInfo",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "sh_id":id,
                },
                success: function(args) {  
                    shops[id]=JSON.parse(args);
                    shopView(id);
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    alert('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
        }
    });//sh click
    $(".fd").click(function() {//음식 정보 클릭(이름, 수량, 가격)
        var id=$(this).parent().attr('class');
        foodView(id);
        $(".tab").hide();
        $(".food").show();
        event.stopPropagation();
    });
    $(".money").click(function() {//table 에서 돈 눌렀을때,
        $(".tab").hide();
        $(".viewInfo").show();
        var fid=$(this).parent().attr('id');
        var o=foods[fid];
        var c=1//$("#"+o.fd_id).html();
        var m=o.fd_price;
        $(".viewInfo").html(c+"개 X "+comma(m)+" = "+comma(c*m));
        event.stopPropagation();
    });
    /* 
    $('.cash').click(function(){//직접결제 클릭
        var str="매장에서 직접 결제 하시겠습니까?"
        if (confirm(str) == true){    //확인
            $.ajax({
                type: "POST",
                url: "cashPay",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function(args) {
                    if(args){
                        alert("주문 완료");
                        var socket = io(); 
                        //args = order_id
                        socket.emit('order', args);
                    }
                    else
                        alert("주문 실패");
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    alert('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
        }// con
    }); 
    */
    $('.allOrder').click(function(){//전체 주문 하기
        var str="모든 메뉴를 주문 하시겠습니까??"
        if (confirm(str) == true){    //확인
            $.ajax({
                type: "POST",
                url: "allOrder",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function(args) {//args = tos={sid:order_id}
                    if(args){
                        //args = order_id      
                        socket.emit('order', args);
                        if(confirm("주문 완료"))
                            location.href='/'
                        else
                            location.href='/'
                        
                    }
                    else
                        alert("주문 실패");
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    alert('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
        }// con
    });
    $(".oCancel").click(function() {//Guest 주문 취소
        var oid=$(this).attr('id');
        $(this).removeClass('oCancel');
        var aid=$(this).attr('class');
        console.log(oid);
        console.log(aid);
        if(confirm("해당 주문자의 주문을 취소하시겠습니까??"))
            $.ajax({
                type: "POST",
                url: "guestBasketCancel",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data:{
                    aid:aid,
                    oid:oid,
                },
                success: function(args) {
                    if(args)
                        location.reload();
                    else
                        alert("회원만 가능합니다.");
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    console.log('text status ' + textstatus + ', err ' + errorThrown);
                }
            });

    });
    
});
function addrChange(){
    
}
function nextChange(){
    var str1=$('.addr').html();
    var str2=$('.profile').html();
    /* $(".btn").hide();
    $(".back").show();
    if(str2){
        $(".pay").show();
    }else if(str1){
        $(".next2").show();
    } */
}
function foodView(id){
    var o=foods[id];
    $(".food .name").html(o.fd_name);
    $(".food .price").html(comma(o.fd_price));
    $(".food img").attr('src',o.fd_img_src);
}
function shopView(id){
    var o=shops[id];
    $(".shop .name").html(o.sh_name);
    $(".shop .address").html(o.sh_address);
    $(".shop .tel").html(o.sh_tel);
}
function setting(){//합계금액, 수량 체크
    //<![CDATA[
        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        Kakao.init('66c36e84314118dc0981423a828aa972');
        // 카카오 로그인 버튼을 생성합니다.
        Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: function(authObj) {
            alert(JSON.stringify(authObj));
          },
          fail: function(err) {
             alert(JSON.stringify(err));
          }
        });
        //kakao.
        /* 
         $.ajax({
                type: "POST",
                url: "guestBasketCancel",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data:{
                    aid:aid,
                    oid:oid,
                },
                success: function(args) {
                    if(args)
                        location.reload();
                    else
                        alert("회원만 가능합니다.");
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    console.log('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
         */
      //]]>
    $(".total").html("합계 : "+comma(totalm));
}

