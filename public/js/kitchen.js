var socket = io(); 
var robj={};
var areaInObj={
    money:0,
    fd:{},//(fid)=>음식 갯수,이름
    Allset:function(){
        this.money=0;
        this.fd={};
        for(i in robj){
            if(robj[i].state_id==0){
                this.money+=robj[i].total_money;
                for(i2 in robj[i].order_foods){
                    var fd=robj[i].order_foods[i2].food;
                    this.fP(fd);
                }
            }
        }
    },
    fP:function(fd){//plus
        var fid=fd.fd_id;
        var name=fd.fd_name;
        if(fid){
            if(!this.fd[fid])
                this.fd[fid]={
                    c:0,
                    name:name
                };
            this.fd[fid].c++;
        }
    },
    fM:function(fid){//minus
        if(this.fd[fid]){
            this.fd[fid].c--;
            if(this.fd[fid].c<=0)
                delete this.fd[fid];
        }
    },
    str:function(){
        var str="총 액수 : "+comma(this.money)+"<br>";
        for(fid in this.fd){
            str+=this.fd[fid].name+" "+this.fd[fid].c+"개<br>";
        }
        return str;
    }
};//area In에 있는 정보 관리하기 위해
var selectOrder_id;
var queue={//음식에 주문정보를 저장하기위해
    obj:{},
    en:function(fid,oid,index){
        if(!this.obj[fid])
            this.obj[fid]=[];
        this.obj[fid].push({
            order_id:oid,
            index_fd:index
        });
    },
    de:function(fid){
        var tos=this.obj[fid].splice(0,1)[0];
        if(this.obj[fid].length==0)
            delete this.obj[fid];
        return tos;
    }
};
var c={
    success:0,
    non_pay:0,
    cooking:0,
    order_wait:0,
    Cancellation:0,
    plus:function(e,num=1){
        $(".end ."+e).show();
        switch(e){
            case "success":
                this.success+=num;
                var str="성공 : "+this.success;
                $(".end ."+e).html(str);
                break;
            case "non_pay":
                this.non_pay+=num;
                var str="결제대기 : "+this.non_pay
                $(".end ."+e).html(str);
                break;
            case "cooking":
                this.cooking+=num;
                var str="준비중 : "+this.cooking;
                $(".end ."+e).html(str);
                break;
            case "order_wait":
                this.order_wait+=num;
                var str="주문접수 : "+this.order_wait;
                $(".end ."+e).html(str);
                break;
            case "Cancellation":
                this.Cancellation+=num;
                var str="주문취소 : "+this.Cancellation;
                $(".end ."+e).html(str);
                break;
        }
        if(num<=0)
            $(".end ."+e).hide();
    }
}
socket.emit('host enter', sid);

socket.on('before receipts',function(rarr){//상점의 모든 영수증 받아오기
    for(i in rarr){
        var o=rarr[i];
        robj[o.order_id]=o;
        rcp(o);
        if(o.order_foods)
            rcpBar(o.order_id);

    }
})
socket.on('now receipt',function(receipt){//새로운 영수증 확인
    rcp(receipt);
    var o=receipt;
    robj[o.order_id]=o;
    rcpBar(o.order_id);
    
    areaInObj.Allset();
    $('.in .sub').html(areaInObj.str());

    console.log(receipt);
    console.log("개인 통신");
})

$(document).ready(function(){
    $(document).click(function(){
        $('.tab').hide();
    });
    $('.tab').click(function(){
        event.stopPropagation();
    });
    $('.area .btn').click(function(){
        var cal=$(this).html();
        if(cal=="+"){
            beforeSize={
                w:$(this).parent().width()/ $(this).parent().parent().width()*100,
                h:$(this).parent().height()/ $(this).parent().parent().height()*100
            }
            $('.area').hide();
            $(this).parent().show();
            $(this).parent().css('width','100%');
            $(this).parent().css('height','90%');
            $(this).html("-");
        }else{
            $('.area').show();
            $(this).parent().css('width',beforeSize.w+'%');
            $(this).parent().css('height',beforeSize.h+'%');
            $(this).html("+");
        }
    });
    $('.in .btn').click(function(){
        areaInObj.Allset();
        var str=areaInObj.str();
        
        $('.in .sub').html(str);
        $('.in .sub').toggle();
    });

    $('.cook').click(function(){//보안문제 예상(select order_id 를 바꿔서 요청할수도)
        var oid=selectOrder_id;
        $.ajax({
            type: "POST",
            url: "startCook",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data:{
                oid:oid
            },
            success: function(receipt) {
                if(receipt){
                    console.log("요리시작");
                    robj[oid]=receipt;
                    rcp(robj[oid]);
                    c.plus('order_wait',-1);
                    socket.emit('cook', oid);
                }
                else{
                    console.log("요리시작 실패");
                }
            },
            error: function(jqXHR, textstatus, errorThrown) {
                console.log('text status ' + textstatus + ', err ' + errorThrown);
            }
        });
    });//tos click
    $('.close').click(function(){
        $(".tab").hide();
    });
    $('.serving').click(function(){
        var oid=selectOrder_id;
        $.ajax({
            type: "POST",
            url: "serving",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data:{
                oid:oid
            },
            success: function(receipt) {
                if(receipt){
                    robj[oid]=receipt;
                    $('.tab').hide();
                    $('#'+oid).remove();
                    c.plus('cooking',-1);
                    rcp(robj[oid]);
                    socket.emit('serving',oid);
                }
                else{
                    console.log("건네주기 실패");
                }
            },
            error: function(jqXHR, textstatus, errorThrown) {
                console.log('text status ' + textstatus + ', err ' + errorThrown);
            }
        });
    });
    $('.non_pay').click(function(){
        console.log("영수증 정보 가져오기 준비중..");
    });
});
function rcp(obj){
    switch(obj.state_id){
        case 0:
            c.plus("order_wait");
            parentObj=$('.in');
            break;
        case 20:
        case 30:
        case 40:
            //c.cooking++;
            c.plus("cooking");
            //var str="요리 진행중 : "+c.cooking;
            //$('.end .cooking').html(str);
            parentObj=$('.out .wait');
            goKitchen(obj.order_id);
            break;
        case -1:
        case 1:
        case 10:
        case 11:
        case 111:
        default:
            //c.success++;
            c.plus("non_pay");
            //c.non_pay++;
            //c.Cancellation++;
            /* 
            var str="성공 : "+c.success;
            $('.end .success').html(str);
            var str="결제대기 : "+c.non_pay;
            $('.end .non_pay').html(str);
            var str="대기 : "+c.cooking;
            $('.end .cooking').html(str);
            var str="주문 접수 : "+c.order_wait;
            $('.end .order_wait').html(str);
            var str="주문취소 : "+c.Cancellation;
            $('.end .Cancellation').html(str); */
            return true;
            //break;
    }
    

    //var status=(obj.total_money<obj.pay_money)?"결제 완료":"미납";
    
    var div=$("<div/>", {
        id: obj.order_id,
        "class": 'rcp',
        on: {
          mouseenter: function() {//rcp 마우스 올렸을때,
            
          },
          click: rcpClick
        }
      }); 
    
    var bar=$('<div/>');
    bar.addClass('bar');
    bar.css('width','0%');
    div.append(bar);

    var p=$('<p/>');
    p.addClass('name')
    p.html(obj.buyer.name);
    div.append(p);

    var p=$('<p/>');
    p.addClass('price')
    p.html(comma(obj.total_money));
    div.append(p);
    
    /* 
    var p=$('<p/>');
    p.addClass('status')
    p.html(status);
    div.append(p); 
    */
    parentObj.append(div);
}
var rcpBar=function(oid,num=0){
    var obj=robj[oid];
    if(obj.state_id!=0){
        var parent=obj.order_foods.length;
        var child=0;
        for(iii in obj.order_foods){
            if(obj.order_foods[iii].state_id==20)
                child++;
        }
        num=parseInt(((parent-child)/parent)*100);
        if(num==100){// 100%
            $('#'+oid+" .bar").css('background','green');    
            robj[oid].state_id=40;
        }
        $('#'+oid+" .bar").css('width',num+'%');
    }
}
var rcpClick=function(){// $('.rcp').click
    var oid=$(this).attr('id');
    selectOrder_id=oid;
    var o=robj[oid];
    $('.info').show();
    $('.info .date span').html(o.order_date);
    $('.info .order_id span').html(o.order_id);
    $('.info .buyer span').html(o.buyer.name);
    $('.info .totalM span').html(o.total_money);
    $('.info .payM span').html(o.pay_money);

    var rcpAddress=$("#"+oid).parent().attr('class');
    $('.tos').hide();
    if(rcpAddress.indexOf('in')>=0){
        $('.cook').show();
    }else{
        if(o.state_id==40)
            $('.serving').show();
    }
    foodListView(o.order_foods);
    event.stopPropagation();
}
var foodListView=function(foods){
    $('.info table').html("");
    for(i in foods){
        var fd=foods[i].food;
        var tr=$('<tr/>');

            var td=$('<td/>');
                var img=$('<img/>');
                img.attr('src',fd.fd_img_src);
            td.append(img);
            tr.append(td);

            var td=$('<td/>');
            td.addClass('name');
            td.html(fd.fd_name);
            tr.append(td);

            var td=$('<td/>');
            td.addClass('price');
            td.html(fd.fd_price);
            tr.append(td);

            var td=$('<td/>');
            td.addClass('status');
            var str="주문접수";
            switch(foods[i].state_id){
                case 20:
                    str="요리시작"
                    break;
                case 30:
                    str="요리중.."
                    break;
                case 40:
                    str="요리완료"
                    break;
            }
            td.html(str);
            tr.append(td);

        $('.info table').append(tr);
    }
}
var goKitchen=function(oid){ 
    $("#"+oid).remove();
    
    $('.info').hide();

    //console.log(robj[oid].order_foods);
    var foods=robj[oid].order_foods;
    for(i in foods){
        if(foods[i].state_id==20){
            var fd=foods[i].food;
            var fid=fd.fd_id;
            queue.en(fid,oid,foods[i].index_fd);
            var img=$('<img/>');
                img.attr('src',fd.fd_img_src);
            if($("#"+fid+" img").length<=0){
                var div=$('<div/>' ,{
                    on: {
                    click: function(){// 주방 음식 완료 됬다는 클릭시
                        var fid=$(this).attr('id');
                        
                        //console.log(fid);
                        //console.log(oid);
                        var result=queue.de(fid);
                        var oid=result.order_id;
                        //console.log(result);
                        //console.log('-----------[kitchen js 403]');
                        $.ajax({
                            type: "POST",
                            url: "Cooked",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            data:{
                                order_id:oid,
                                index_fd:result.index_fd
                            },
                            success: function(receipt) {
                                robj[oid]=receipt;
                                rcpBar(oid);
                                $("#"+fid+" img:nth-child(3)").remove();
                                kitchenFoodCount(fid);
                            },
                            error: function(jqXHR, textstatus, errorThrown) {
                                alert('text status ' + textstatus + ', err ' + errorThrown);
                            }
                        });
                        //console.log("fid = "+fid+", oid = "+oid);
                    }
                    }
                });
                div.attr('id',fid);
                div.addClass('fd');
                div.append("<p>"+fd.fd_name+"</p>");
                div.append("<p/>");

                $('.kitchen').append(div);
            }
            $("#"+fid).append(img);
            kitchenFoodCount(fid);
        }
    }
}
var kitchenFoodCount=function(fid){
    var count=$("#"+fid+" img").length;
    if(count==0){
        $("#"+fid).remove();
    }
    $("#"+fid+" p:nth-child(2)").html(count+"개");
}