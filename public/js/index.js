var select={//id
    shop:null,
    food:null
}
var basketArr={};
var basketLength=0;
var AutoIncrement=0;
var setting=function(){
    if($('.board').length==1)
        select.shop=$('.board').attr('id');
    basketFX(null);
}
var socket=io();
$(document).ready(function(){
    setting();
    $(document).click(function() {
        $('.tab').hide();
    });
    $('.basket.btn').click(function(){//빌지 보기
        $('.order_list').slideToggle();
        orderListView();
        event.stopPropagation();
    });
    $('.order_list .change_name').click(function(){//이름 수정하기 클릭
        var insert_name=prompt("변경할 이름을 입력해주세요.");
        if(insert_name!=null){
            $('.change_name').html("변경 중..");
            $.ajax({
                type: "POST",
                url: "guestNameChange",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {   
                    name:insert_name
                },
                success: function(args) {
                    if(args)
                        u_name=insert_name;
                    else
                        console.log("이름 변경 실패");
                    $('.basket_name').html(u_name);
                    $('.change_name').html("이름 수정");
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    console.log('text status ' + textstatus + ', err ' + errorThrown);
                    $('.change_name').html("이름 수정");
                }
            });
        }//if 
    });
    $('.one img').click(function(){//음식 정보 메뉴화면 띄우기
        $('.food_info').fadeIn();
        $('.food_info .status').html("클릭하여 담기");
        select.food=$(this).parent().attr('id');
        //select.food=$(this).parent().attr('id');
        //var food=foods[$(this).attr('id')];
        var src=foods[select.food].src;//$('#'+select.shop+' img').attr('src');
        var name=foods[select.food].name;//$('#'+select.shop+' .name').html();
        var price=foods[select.food].price;//$('#'+select.shop+' .price span').html();
        var sh_name=$('#'+select.food+' .price a').html();
        $('.food_info .info img').attr('src',src);
        $('.food_info .name').html(name);
        $('.food_info .price').html(comma(price));
        $('.food_info .shop .shop_name').html(sh_name);
        //---------------------------------------------
        $('.clickCount').html("조회수 #회");
        $('.orderCount span').html(" ");
        $.ajax({
            type: "POST",
            url: "fdata",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {   
                fid:select.food
            },
            success: function(args) {
                //console.log(args);
                $('.clickCount').html("조회수 "+args.c+"회");
                $('.orderCount span').html(args.o);
            },
            error: function(jqXHR, textstatus, errorThrown) {
                console.log('text status ' + textstatus + ', err ' + errorThrown);
            }
        });

        event.stopPropagation();
    });
    $('.tab').click(function(){
        event.stopPropagation();
    });
    $('.close').click(function(){
        $(this).parent().hide();
    });
    $('.order_list .order').click(function(){//주문하기 클릭
        //location.href='/OrderCheck';
        var lockedPost=function(locked,cb){
            $.ajax({
                type: "POST",
                url: "basketLocked",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data:{
                    locked:locked
                },
                success: cb,
                error: function(jqXHR, textstatus, errorThrown) {
                    console.log('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
        }
        lockedPost(true,function(){
            if(confirm("최종 주문 확인하겠습니다.")){
                $.ajax({
                    type: "POST",
                    url: "OrderCheck",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function(args) {    
                        var str="";
                        for(i in args.fdCount){
                            var fd=args.fdCount[i];
                            str+=fd.name+" "+fd.count+"개\n";
                        }
                        str+="지불할 금액 : "+comma(args.totalM)+"\n\n\n";
                        str+="맞으시면 '확인' 그렇지 않으면 '취소'를 눌러주세요."
                        if(confirm(str)){
                            $.ajax({//최종 주문시작
                                type: "POST",
                                url: "order",
                                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                success: function(tos) { 
                                    socket.emit('order', tos);
                                    alert("주문이 정상적으로 되었습니다.\n\n\n오른쪽 노란 버튼을 누르시면\n확인 하실 수 있습니다.");
                                    location.reload();
                                },
                                error: function(jqXHR, textstatus, errorThrown) {
                                    console.log('text status ' + textstatus + ', err ' + errorThrown);
                                }
                            });// ajax
                        }else{
                            lockedPost(false,function(args){console.log(args);});
                            location.reload();
                        }
                    },
                    error: function(jqXHR, textstatus, errorThrown) {
                        console.log('text status ' + textstatus + ', err ' + errorThrown);
                    }
                });
            }else{//if 주문하시겟습니까?
                lockedPost(false,function(args){console.log(args);})
            }
        })
    });// $('.order_list .order').click
    $('.info img, .info .choice').click(function(){//음식 담기   
        $('.info img').fadeOut().fadeIn();     
        basketFX(select.food);
    });
    $('.info img, .info .choice').hover(function(){
        $('.food_info .status').fadeIn();
    },function(){
        $('.food_info .status').fadeOut();
    });
    $('.board .sh_name').click(function(){
        var id=$(this).parent().attr('id');
        location.href='/shop='+id;
    });
    $('.board .sh_name .offBtn').click(function(){
    });
    $('.food_add').click(function(){
        $(".food_new").show();
        event.stopPropagation();
    });
    $('.food_info .edit').click(function(){
        $(".tab").hide();
        var name=foods[select.food].name;//$('#'+select.shop+' .name').html();
        var price=foods[select.food].price;//$('#'+select.shop+' .price span').html();
        //$('.food_info .info img').attr('src',src);
        $(".food_edit input[name='fd_id']").val(select.food);
        $(".food_edit input[name='name']").val(name);
        $(".food_edit input[name='price']").val(price);
        //$('.food_info .shop .shop_name').html(sh_name);

        $(".food_edit").show();
    });
    $('.food_edit .delete').click(function(){
        var str="메뉴를 삭제하시겠습니까?"
        if (confirm(str) == true){    //확인
            $.ajax({
                type: "POST",
                url: "DeleteFood",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "fd_id": select.food
                },
                success: function() {        
                    alert("삭제 완료");
                    location.reload();
                },
                error: function(jqXHR, textstatus, errorThrown) {
                    alert('text status ' + textstatus + ', err ' + errorThrown);
                }
            });
        }
    });
    /*-------------------------------------------------------------------------------------------


        



        team 클릭





    ----------------------------------------------------------------------------------------------*/
    $('.teamManage').click(function(){//팀 관리 클릭
        $(".tab").hide();
        $('.my_menu').hide();
        $(".team_menu").show(); 
        $('.team_menu .list').html("");
        $.ajax({
            type: "POST",
            url: "team",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function(args) {
                console.log(args);
                for(i in args){
                    var t=args[i];
                    var div=$('<div/>');
                    div.attr('id',t.t_id);
                    div.addClass('party');
                    div.html(t.t_name);
                    var span=$('<span/>',{
                        on: {
                            click: function(){
                                var tid=$(this).parent().attr('id');
                                if($('#'+tid+" table").length==0)
                                $.ajax({
                                    type: "POST",
                                    url: "teamMore",
                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                    data: {
                                        team_id:tid
                                    },
                                    success: function(args) { 
                                        $("#"+tid+' .more').html('가리기');
                                        console.log(args);
                                        var member=args.member;                                        
                                        var table=$('<table/>');
                                            var tr=$('<tr/>');
                                                var ths=['id','job','초대권한'];
                                                if(args.sh_id){
                                                    ths.push('graph');
                                                    ths.push('counter');
                                                    ths.push('kitchen');
                                                }
                                                for(j in ths){    
                                                    var th=$('<th/>');
                                                    th.html(ths[j]);
                                                    tr.append(th);
                                                }
                                                table.append(tr);
                                            for(j in member){
                                                var m=member[j];
                                                var tr=$('<tr/>');
                                                    var td=$('<td/>');
                                                    td.html(m.ac_id);
                                                    tr.append(td);
                                                    var td=$('<td/>');
                                                    td.html(m.grade);
                                                    tr.append(td);
                                                    var td=$('<td/>');
                                                    td.html(m.invite);
                                                    tr.append(td);
                                                    if(args.sh_id){
                                                        var td=$('<td/>');
                                                        td.html(m.graph);
                                                        tr.append(td);
                                                        var td=$('<td/>');
                                                        td.html(m.counter);
                                                        tr.append(td);
                                                        var td=$('<td/>');
                                                        td.html(m.kitchen);
                                                        tr.append(td);
                                                    }
                                                table.append(tr);
                                            }
                                        $("#"+tid).append(table);
                                        console.log('index 230 팀정보 전달받음.');
                                    },
                                    error: function(jqXHR, textstatus, errorThrown) {
                                        console.log('text status ' + textstatus + ', err ' + errorThrown);
                                    }
                                });//ajax
                                else{
                                    $('#'+tid+" table").remove();
                                    $("#"+tid+' .more').html('더보기');
                                }

                            }//더보기 click
                        }
                    });
                    span.addClass('more');
                    span.html("더보기");
                    div.append(span);
                    if(t.grade==0){
                        var span=$('<span/>',{
                            on: {
                                click: function(){// 수락하기 클릭
                                    var tid=$(this).parent().attr('id');
                                    $.ajax({
                                        type: "POST",
                                        url: "Joinsuccess",
                                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                        data: {
                                            "team_id":tid
                                        },
                                        success: function(args) {        
                                            
                                        },
                                        error: function(jqXHR, textstatus, errorThrown) {
                                            console.log('text status ' + textstatus + ', err ' + errorThrown);
                                        }
                                    });
                                }
                            }
                        });//span 초대하기
                        span.addClass('join');
                        span.html('수락하기');
                        div.append(span);
                    }
                    else if(t.invite){
                        var span=$('<span/>',{
                            on: {
                                click: function(){// 초대하기 클릭
                                    var tid=$(this).parent().attr('id');
                                    $("#"+tid+" .searching").toggle();
                                    $("#"+tid+" .searchingList").toggle();
                                }
                            }
                        });//span 초대하기
                        span.addClass('inviteBtn');
                        span.html('초대하기');
                        div.append(span);
                    }
                    console.log(t);

                    
                    var input=$('<input/>',{
                        on: {
                            change: function(){
                                var tid=$(this).parent().attr('id');
                                var aid=$(this).val();
                                $.ajax({
                                    type: "POST",
                                    url: "memberSearching",
                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                    data: {
                                        team_id:tid,
                                        ac_id:aid
                                    },
                                    success: function(args) { 
                                        console.log(args);
                                        var div=$('<div/>');
                                            div.html(args.name);

                                        if(!args.invite){
                                            var button=$('<button/>',{//초대 클릭하기
                                                on:{
                                                    click:function(){
                                                        var tid=$(this).attr('id');
                                                        var aid=$(this).attr('class');
                                                        $.ajax({
                                                            type: "POST",
                                                            url: "teamInvite",
                                                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                                            data: {
                                                                "team_id":tid,
                                                                "ac_id":aid
                                                            },
                                                            success: function(args) { 
                                                                console.log(args);
                                                            },
                                                            error: function(jqXHR, textstatus, errorThrown) {
                                                                console.log('text status ' + textstatus + ', err ' + errorThrown);
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                            button.attr('id',tid);
                                            button.addClass(args.aid);
                                            button.html('초대');
                                            div.append(button);
                                        }//if 
                                        
                                        $('#'+tid+" .searchingList").html(div);
                                    },
                                    error: function(jqXHR, textstatus, errorThrown) {
                                        console.log('text status ' + textstatus + ', err ' + errorThrown);
                                    }
                                });//ajax
                            }
                        }
                    });//span 초대하기
                    input.addClass('searching');
                    input.attr('placeholder','초대할 id 입력');
                    div.append(input);

                    var searchingList=$('<div/>');
                    searchingList.addClass('searchingList');
                    div.append(searchingList);

                    $('.team_menu .list').append(div);
                }//for
                //console.log("team 관리 준비중..");
            },
            error: function(jqXHR, textstatus, errorThrown) {
                console.log('text status ' + textstatus + ', err ' + errorThrown);
            }
        });
        event.stopPropagation();
    });//팀관리 클릭
    /*-------------------------------------------------------------------------------------------


        



        team 클릭 끝





    ----------------------------------------------------------------------------------------------*/
});
var orderListView=function(){
    var totalMoney=0;
    var html=null;
    for(oid in basketArr){
        var fid=basketArr[oid].fd_id;
        var src=basketArr[oid].fd_img_src;
        var name=basketArr[oid].fd_name;//$('#'+select.shop+' .name').html();
        var price=basketArr[oid].fd_price;//$('#'+select.shop+' .price span').html();
        html+="<tr id='"+oid+"'>"
            +"<td class='fd_img'>"
                +"<img src='"+src+"'></img>"
            +"</td>"
            +"<td class='name'>"
                +name
            +"</td>"
            +"<td class='price'>"
                +comma(price)
            +"</td>"
            +"<td>"
                +"<button class='cancel btn' onclick=\"cancel('"+oid+"')\">"
                    +"<img src='../img/cancel.png'></img>"
                +"</button>"
            +"<td>"
            +"</tr>";
        totalMoney+=Number(price);
    }
    $('.total').html("합계 : "+comma(totalMoney));
    $(".order_list .list").html(html);
}
var bilgeViewCheck=function(){
    (basketLength>0)
    ?$('.basket_zone').show()
    :$('.basket_zone,.order_list').hide();
}
var basketFX=function(id,sta="Add"){//add, minus
    var url="basket"+sta;
    var data={
        "fd_id": id
    };
    if(sta=="Minus"){
        data={
            "order_id":id
        }
    }
    $('.food_info .status').html("응답 대기중...");    
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: data,
        success: function(args) {     
            if(args){
                var obj = args;
                basketArr=obj.list;
                basketLength=Object.keys(obj.list).length;
                if(select){
                    $('.food_info .status').html(basketLength+"개 주문");    
                    bilgeViewCheck();
                    if(sta=="Minus")
                        orderListView();
                }
            }else{
                $('.food_info .status').html("로그인을 하셔야 가능합니다.");    
            }
        },
        error: function(jqXHR, textstatus, errorThrown) {
            console.log('text status ' + textstatus + ', err ' + errorThrown);
        }
    });
}
var cancel=function(id){
    $("#"+id+" .name").html("취소중");
    $("#"+id+" .price").html("...");
    basketFX(id,"Minus")
};
