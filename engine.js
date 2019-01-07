const crypto = require('crypto');
var db = require('./db/con_db')();
/*--------------------------------------------------

var shops=[];
var foods=[];
var users={};// member 정보 // (ac_id)=>  이름,생일 등.. 장바구니도
var guest={};// 비회원 정보 //(ip)=> 닉네임,장바구니
var baskets={};// 장바구니 정보 //index = aid(ac_id(회원),ip(비회원) 둘중에 하나) , name,list:{}
var receipts={};//order_id;
var orderFoodList={};//주문 음식 상태 index=oid =>{
    total,//해야할 음식 갯수
    left:['fid']//남은 list
}
var fdata={};//음식 클릭,주문건수 관련 index = fid
var guestCount=0;//나중에 랜덤 수로 교체 

----------------------------------------------------*/
var shops=[];
var foods=[];
var users={};// member 정보 
var guest={};// 비회원 정보 
var baskets={};// 장바구니 정보 
var receipts={
    obj:{},
    in:function(oid,rcp){
        this.obj[oid]=rcp;
    },
    foodPush:function(oid,order_food){
        if(!this.obj[oid].order_foods){
            this.obj[oid].order_foods=[];
        }
        var fid=order_food.fd_id;
        delete order_food.fd_id;
        order_food.food=foods[fid];
        this.obj[oid].order_foods.push(order_food);
    },/* 
    view:function(oid){//order_id로 검색 순수 db정보
        return this.obj[oid];
    }, */
    view:function(oid){//order_id로 검색 사람을 위한 정보
        var result={...this.obj[oid]};
        var aid=result.buy_ac_id;
        result.buyer=users[aid];
        delete result.buy_ac_id;
        return result;
    },
    my:function(ac_id,stateArr){//내 영수증들
        var result=[];
        for(i in this.obj)
            if(this.obj[i].buy_ac_id==ac_id&&stateArr.indexOf(this.obj[i].state_id)>=0)
                result.push(this.obj[i]);
        return result;
    },
    shop:function(sh_id){//상점영수증들
        var result=[];
        for(oid in this.obj){
            if(this.obj[oid].sh_id==sh_id){
                var o={...this.obj[oid]};
                var aid=o.buy_ac_id;
                o.name=(users[aid])
                        ?users[aid].name
                        :(guest[aid])?guest[aid].name:aid;
                //o.orderFoodList=orderFoodList.view(oid);
                result.push(o);
            }
        }
        return result;
    },
    state:function(oid,state_id){//전체 상태를 바꾼다.
        if(this.obj[oid]){
            this.obj[oid].state_id=state_id;
            for(i in this.obj[oid].order_foods){
                var fd=this.obj[oid].order_foods[i];
                fd.state_id=state_id;
            }
        }
    },
    stateFood:function(oid,index_fd,state_id){//개개인 음식 상태를 바꾼다.
        if(this.obj[oid]&&this.obj[oid].order_foods&&this.obj[oid].order_foods[index_fd]){
            var fd=this.obj[oid].order_foods[index_fd];
            if(fd.index_fd==index_fd)
                fd.state_id=state_id;
        }
    }
};//order_id; => 영수증 정보
var team={
    acTeam:{},//(ac_id)=> team id
    obj:{},//
    init:function(tid,sh_id){
        this.obj[tid]={
            sh_id:sh_id,
            member:{},
        }
    },
    load:function(){//DB에서 불러오기
        db.select("select * from team",[],function(err,rows){
            if(err) console.log(err);
            else{
                for(i in rows){
                    var tid=rows[i].t_id;
                    var sid=rows[i].sh_id;
                    team.init(rows[i].t_id,sid);
                }
                db.select("select * from team_member",[],function(err,rows){
                    if(err) console.log(err);
                    else{        
                        for(i in rows){
                            var t=rows[i];
                            team.obj[t.t_id].member[t.ac_id]=t;
                            if(!team.acTeam[t.ac_id])
                                team.acTeam[t.ac_id]=[];
                            team.acTeam[t.ac_id].push(t.t_id);
                        }        
                        db.select("select * from team_sh_auth",[],function(err,rows){
                            if(err) console.log(err);
                            else{        
                                for(i in rows){
                                    var t=rows[i];
                                    if(team.obj[t.t_id]&&team.obj[t.t_id].member[t.ac_id]){                            
                                        team.obj[t.t_id].member[t.ac_id].counter=t.counter;
                                        team.obj[t.t_id].member[t.ac_id].kitchen=t.kitchen;
                                        team.obj[t.t_id].member[t.ac_id].graph=t.graph;
                                    }
                                }
                                console.log("++++[DB] team 준비 대기 완료.");
                            }
                        });
                    }
                });//select team member
            }
        });//select from team
    },
    invite:function(tid,aid){//초대하기
        if(!this.obj[tid])
            return false;
        var sid=this.obj[tid].sh_id;
        valObj={
            t_id:tid,
            ac_id:aid,
            t_name:(sid)?shops[sid].sh_name+" 팀":R(0,100)+"T",
            grade:0,
            invite:0
        }
        if(sid){
            valObj.counter=0;
            valObj.kitchen=0;
            valObj.graph=0;
        }
        
        if(!this.acTeam[aid])
            this.acTeam[aid]=[];
        this.acTeam[aid].push(tid);

        this.obj[tid].member[aid]=valObj;
    },
    join:function(tid,aid){
        if(!this.obj[tid])
            return false;
        this.obj[tid].member[aid].grade=2;
        return true;
    },
    make:function(aid,sid=null){//sid = 상점 id
        var tid=hashKey(this.obj,8,'t_');
        this.init(tid,sid);
        valObj={
            t_id:tid,
            ac_id:aid,
            t_name:(sid)?shops[sid].sh_name+" 팀":R(0,100)+"T",
            grade:1,
            invite:1
        }
        if(sid){
            valObj.counter=1;
            valObj.kitchen=1;
            valObj.graph=1;
        }
        this.obj[tid].member[aid]=valObj;
    },
    view:function(tid){
        return this.obj[tid];
    },
    eachView:function(tid,aid){//팀 개개인 정보
        return this.obj[tid].member[aid];
    },
    team_id:function(aid){
        return this.acTeam[aid]
    }
    /* 
    make:function(aid,sh_id=null){
        var tid=hashKey(this.obj,8,'t_');
        if(sh_id){
            var sqls=[
                {
                    sql:"insert into team values(?,?,?,?,?,?)",
                    values:[
                        tid,
                        aid,
                        sh_id,
                        shops[sh_id].sh_name,
                        1,//grade
                        1// 초대권환
                    ]
                },
                {
                    sql:"insert into team_sh_auth values(?,?,?,?,?)",
                    values:[
                        tid,
                        aid,
                        1,1,1// 그래프, 카운터, 주방 권환
                    ]
                }
            ]
            db.query(sqls,function(err){
                if(err)console.log(err);
                else{
                    this.ac[aid]=tid;
                    
                }
            });
        }else{

        }
    }//make
     */
}
var fdata={};//음식 클릭,주문건수 관련 
var guestCount=0;//나중에 랜덤 수로 교체 
/* 
var orderFoodList={//주문 음식 상태
    obj:{},
    in:function(oid,fid){
        if(!this.obj[oid])
            this.obj[oid]={//초기값
                length:0,//총 갯수
                left:[]//남은 food_id 목록
            };
        this.obj[oid].length++;
        this.obj[oid].left.push(fid);
    },
    view:function(oid){
        return this.obj[oid];
    },
    remove:function(oid,fid){
        if(this.obj[oid]){
            this.obj[oid].length--;
            var arr=this.obj[oid].left;
            var index=arr.indexOf(fid);
            return (index>=0)?arr.splice(index,1):false;
        }else
            return false;
    }
}; */
//socket 용--------------------------------------//
var ipArr={}//index=ip => ac_id;
//-----------------------------------------------//

db.select("select * from shop",[],function(err,rows){
    if(err) console.log(err);
    else{
        for(i in rows){
            shops[rows[i].sh_id]=rows[i];
            shops[rows[i].sh_id].foods={};
        }
        console.log("++[DB] shops select 대기 완료.");

        db.select("select * from food",[],function(err,rows){
            if(err) console.log(err);
            else{
                for(i in rows){
                    var fid=rows[i].fd_id;//fd_id
                    var sid=rows[i].sh_id;//sh_id
                    foods[fid]=rows[i];
                    if(shops[sid]){
                        shops[sid].foods[fid]=foods[fid];
                    }
                }
                console.log("+++[DB] foods select 대기 완료.");
                db.select("select * from receipt",[],function(err,rows){
                    if(err) console.log(err);
                    else{
                        for(i in rows){
                            var oid=rows[i].order_id;
                            receipts.in(oid,rows[i]);
                        }
                        console.log("++[DB] receipts select 대기 완료.");
                        db.select("select * from order_food",[],function(err,rows){
                            if(err) console.log(err);
                            else{
                                for(i in rows){
                                    var fid=rows[i].fd_id;
                                    var oid=rows[i].order_id;
                                    var state_id=rows[i].state_id;
                                    receipts.foodPush(oid,rows[i]);
                                    /* 
                                    if(state_id==0||state_id==20||state_id==30)
                                        orderFoodList.in(oid,fid);
                
                                    if(receipts[oid]){
                                        if(!receipts[oid].order_foods){
                                            receipts[oid].order_foods=[];
                                        }
                                        receipts[oid].order_foods.push(foods[fid]);
                                    } */
                                    if(!fdata[fid]){
                                        fdata[fid]={
                                            oCount:0,//주문건수
                                            cArr:{},//클릭한 id 배열
                                        }
                                    }
                                    fdata[fid].oCount++;
                                }
                                console.log("+++[DB live] order_food [fdata] 및 주문건에 음식목록 대기 완료.");
                            }
                        });//select from order_food
                    }
                });//select from receipt    
            }
        });//select from food        
    }
});//select from shop
db.select("select * from member",[],function(err,rows){
    if(err) console.log(err);
    else{
        for(i in rows){
            var aid=rows[i].ac_id;
            users[aid]=rows[i];
        }
        console.log("++[DB] member select 대기 완료.");
    }
});//select from member    
team.load();
/* 
db.select("select * from team",[],function(err,rows){
    if(err) console.log(err);
    else{
        for(i in rows){
            var tid=rows[i].t_id;
            var aid=rows[i].ac_id;
            teams.in(tid,aid);
        }
        console.log("++[DB] team select 대기 완료.");
    }
});//select from member     */
var ipfx=(req)=>req.connection.remoteAddress.replace(/\:/gi,"A");
var acid=function(req){
    var aid=req.session.ac_id;// user_id
    var ip=ipfx(req);
    return (aid)?aid:ip;
}
var R=(max)=>parseInt(Math.random()*max);// 0<= ~ < max
var key=function(len,str=""){
  var s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for(i=0;i<len;i++)
    str+=s[R(s.length)];
  return str;
}
var hashKey=function(a,l,s=""){//arr, length, str //기본키 생성
    var k=key(l,s);
    while(a[k]!=null)
        k=key(l,s);
    return k;
}
module.exports = function(){
    return {
        test:function(){    
            console.log("engine play gogo");
            return shops
        },
        salt:function(){
            return key(12);
        },
        passwordCheck:function(id,inStr,cb){//비밀번호 체크
            var sql="select * from account where ac_id=(?)";
            var values=[
                id
            ];
            db.select(sql,values,function(err,rows){
                if(err) cb(false);
                else{
                    if(rows[0]){
                        var pwd=rows[0].pwd;
                        var saltStr=rows[0].salt;
                        if(saltStr)
                            crypto.pbkdf2(inStr, saltStr, 100000, 64, 'sha512', (err, key) => {
                                cb(
                                    (err)
                                    ?false
                                    :(pwd===key.toString('base64'))
                                );
                            });
                        else
                            cb(false);
                    }else
                        cb(false);
                }
            });
        },
        password:function(inStr,saltStr,cb){//비밀번호 생성
            crypto.pbkdf2(inStr, saltStr, 100000, 64, 'sha512', (err, key) => {
                cb(
                    (err)
                    ?null
                    :key.toString('base64')
                );
            });
        },
        shop_add:function(shop,cb){
            var id=key(8,"sh_");
            while(shops[id]!=null)
                id=key(8,"sh_");
            shop['sh_id']=id;
            shop.foods={};
            sql="insert into shop values(?,?,?,?,?)"
            values=[
                shop.ac_id,
                shop.sh_id,
                shop.sh_name,
                shop.sh_address,
                shop.sh_tel
            ]
            db.add(sql,values,function(err){
                if(err){
                    cb(err)
                }else{
                    cb(null);
                    shops[id]=shop;
                }
            });
        },
        food_add:function(food,cb){
            if(food.req_ac_id!=shops[food.sh_id].ac_id){
                cb("요청자와 상점주인 id가 맞지 않는다.");
                return false;
            }
            var id=hashKey(foods,8,"fd_");
            food.fd_id=id;
            sql="insert into food values(?,?,?,?,?)"
            values=[
                food.sh_id,
                food.fd_id,
                food.fd_name,
                food.fd_price,
                food.fd_img_src
            ]
            db.add(sql,values,function(err){
                if(err){
                    cb(err)
                }else{
                    cb(null);
                    delete food.req_ac_id;
                    var fid=food.fd_id;
                    var sid=food.sh_id;
                    foods[fid]=food;
                    shops[sid].foods[fid]=foods[fid];
                        
                }
            });
        },
        del:function(food,cb){
            if(food.req_ac_id!=shops[food.sh_id].ac_id){
                cb("요청자와 상점주인 id가 맞지 않는다.");
                return false;
            }
            sql="delete from food where fd_id=(?)"
            values=[
                food.fd_id
            ]
            db.add(sql,values,function(err){
                if(err){
                    cb(err)
                }else{
                    cb(null);
                    delete foods[food.fd_id];
                    delete shops[food.sh_id].foods[food.fd_id];
                }
            });
        },
        food_update:function(food,cb){
            if(food.req_ac_id!=shops[food.sh_id].ac_id){
                cb("요청자와 상점주인 id가 맞지 않는다.");
                return false;
            }
            sql=
            "update food set fd_name=(?),fd_price=(?),fd_img_src=(?)"
            +" where fd_id=(?)";
            values=[
                food.fd_name,
                food.fd_price,
                food.fd_img_src,
                food.fd_id
            ]
            //console.log(food);
            db.add(sql,values,function(err){
                if(err){
                    cb(err)
                }else{
                    cb(null);
                    delete food.req_ac_id;
                    foods[food.fd_id]=food;
                    shops[food.sh_id].foods[food.fd_id]=food;                    
                }
            });
        },
        my_shops:function(id){//주인id
            var result=[];
            for(i in shops)
                if(shops[i].ac_id==id)
                    result.push(shops[i]);
            return result;
        },
        shops:function(id=null){//상점id
            var result=[];
            if(id)
                return shops[id]
            else{
                for(i in shops)
                  result.push(shops[i]);
                return result;
            }
        },
        shop_foods:function(id=null){//상점id
            return shops[id].foods;
        },
        foods:function(id=null){//음식id
            return (id)?foods[id]:foods;
        },
        guestBasketCancel:function(aid,oid){
            delete baskets[aid].list[oid];
            return false;
        },
        signup:function(user){//회원가입
            var aid=user.id;
            users[aid]={
                ac_id:aid,
                name:user.name,
                nick_name:null,
                tel:null,
                create_date:null,
                jender:null,
                birthday:null
            }
        },
        basket:function(req,status=null){
            var aid=req.session.ac_id;//)?req.session.ac_id:null;//user id
            var ip=req.connection.remoteAddress.replace(/\:/gi,"A");
            //
            var obj;
            if(!aid){
                if(!guest[ip])
                    guest[ip]={
                        ip:ip,
                        name:"no."+guestCount++,
                        list:{}
                    };
                obj=guest[ip];
            }
            else{
                if(!users[aid].basket)
                    users[aid].basket={
                        ac_id:aid,
                        name:users[aid].name,
                        list:{}
                    };
                obj=users[aid].basket;
            }
            switch(status){
                case "add":
                    var fid=req.body.fd_id;//food id
                    if(fid&&!obj.locked){
                        var sid=foods[fid].sh_id;
                        var oid=key(3,"OID_");
                        while(obj.list[oid]!=null)
                            oid=key(3,"OID_");
                        obj.list[oid]=foods[fid];

                        aid=(aid)?aid:ip;
                        baskets[aid]=obj;
                    }
                    break;
                case "minus":
                    var oid=req.body.order_id;
                    if(!obj.locked)
                        delete obj.list[oid];//=foods[fid];
                    //users[aid].length--;
                    break;
                case "locked"://잠그기
                    obj.locked='true';
                    break;   
                case "unlocked"://잠그기 해제
                    delete obj.locked;
                    break;     
                case "reset"://초기화 
                    delete obj.locked;
                    obj.list={};
                    break;    
                case "all"://장바구니 전체 확인
                    return baskets;
            }
            return obj;
        },
        guestNameChange:function(ip,name){
            if(guest[ip]){
                guest[ip].name=name;
                return true;
            }
            return false;
        },
        Order:function(req,cb){//주문하기
            var aid=acid(req);
            //var oid=hashKey(receipts,8,"order_");//oid
            var robj={};//receipt obj, key=sid
            var sqls=[];
            var i2=aid;
            for(j2 in baskets[i2].list){
                var o=baskets[i2].list[j2]; //oid_aaa 같은 주문정보
                var sid=o.sh_id;
                if(!robj[sid]){//if robj [상점id]가 없을때,
                    var oid=hashKey(receipts,8,"order_");            
                    var dt=new Date();
                        dt.setHours(dt.getHours() + 9);// 한국시간 + 9
                        dt="(UTC+9)"+dt.toLocaleString();
                    robj[sid]={//초기화
                        sh_id:sid,
                        buy_ac_id:aid,
                        order_id:oid,
                        state_id:0,
                        order_date:dt,
                        total_money:0,
                        pay_money:0,
                        order_foods:[]
                    };
                    sqls.push({
                        sql:"insert into receipt values(?,?,?,?,?,?,?)",
                        values:[
                            robj[sid].sh_id,
                            robj[sid].buy_ac_id,
                            robj[sid].order_id,
                            robj[sid].state_id,
                            robj[sid].order_date,
                            {tm:robj[sid].total_money},
                            robj[sid].pay_money
                        ]
                    });
                }//if robj [상점id]가 없을때,
                robj[sid].total_money+=o.fd_price;
                var index_order_foods=robj[sid].order_foods.length;
                var order_food={
                    order_id:robj[sid].order_id,//oid
                    ac_id:i2,//ac_id
                    fd_id:o.fd_id,
                    state_id:0,
                    req_txt:baskets[i2].name, //req_txt
                    index_fd:index_order_foods,//index_fd 음식 순서
                }
                robj[sid].order_foods.push(order_food);
                sqls.push({
                    sql:"insert into order_food values(?,?,?,?,?,?)",
                    values:[
                        order_food.order_id,
                        order_food.ac_id,
                        order_food.fd_id,
                        order_food.state_id,
                        order_food.req_txt,
                        order_food.index_fd
                    ]
                });//sqls push
            }
            
            for(i2 in sqls){//total money 등록 때문에 
                if(sqls[i2].values[5]&&sqls[i2].values[5].tm==0){
                    sqls[i2].values[5]=robj[sqls[i2].values[0]].total_money;
                }
            }
            db.query(sqls,function(err){
                if(err){
                    cb(null);
                }
                else{
                    var tos={};//(sid)=>order_id
                    for(i2 in robj){//영수증 non쿼리형식 등록
                        var obj=robj[i2];
                        var oid=obj.order_id;
                        tos[i2]=oid;
                        for(j2 in obj.order_foods){//주문건수 카운트 
                            var obj2=obj.order_foods[j2];
                            var fid=obj2.fd_id;
                            delete obj2.fd_id;
                            obj2.food=foods[fid];
                            if(!fdata[fid])
                                fdata[fid]={
                                    oCount:0,//주문건수
                                    cArr:{},//클릭한 id 배열
                                }
                            fdata[fid].oCount++;
                            //orderFoodList.in(oid,fid);
                        }
                        var ac_id=obj.buy_ac_id;//구매자
                        obj.name=baskets[ac_id].name;
                        receipts.in(oid,obj);
                        
                        //console.log("1단계 진단 끝");
                        //console.log("engine.js receipts 확인차")
                        //console.log(receipts[tos[i2]]);
                    }
                    
                    //baskets[aid].list={};
                    
                    cb(tos);
                }
            });
        },//order
        TebahOrder:function(req,cb){
            var aid=acid(req);
            //var oid=hashKey(receipts,8,"order_");//oid
            var robj={};//receipt obj, key=sid
            var sqls=[];
            for(i2 in baskets){
                for(j2 in baskets[i2].list){
                    var o=baskets[i2].list[j2]; //oid_aaa 같은 주문정보
                    var sid=o.sh_id;
                    if(!robj[sid]){//if robj [상점id]가 없을때,
                        var oid=hashKey(receipts,8,"order_");            
                        var dt=new Date();
                            dt.setHours(dt.getHours() + 9);// 한국시간 + 9
                            dt="(UTC+9)"+dt.toLocaleString();
                        robj[sid]={//초기화
                            sh_id:sid,
                            buy_ac_id:aid,
                            order_id:oid,
                            state_id:0,
                            order_date:dt,
                            total_money:0,
                            pay_money:0,
                            order_foods:[]
                        };
                        sqls.push({
                            sql:"insert into receipt values(?,?,?,?,?,?,?)",
                            values:[
                                robj[sid].sh_id,
                                robj[sid].buy_ac_id,
                                robj[sid].order_id,
                                robj[sid].state_id,
                                robj[sid].order_date,
                                {tm:robj[sid].total_money},
                                robj[sid].pay_money
                            ]
                        });
                    }//if robj [상점id]가 없을때,
                    robj[sid].total_money+=o.fd_price;
                    var index_order_foods=robj[sid].order_foods.length;
                    var order_food={
                        order_id:robj[sid].order_id,//oid
                        ac_id:i2,//ac_id
                        fd_id:o.fd_id,
                        state_id:0,
                        req_txt:baskets[i2].name, //req_txt
                        index_fd:index_order_foods,//index_fd 음식 순서
                    }
                    robj[sid].order_foods.push(order_food);
                    sqls.push({
                        sql:"insert into order_food values(?,?,?,?,?,?)",
                        values:[
                            order_food.order_id,
                            order_food.ac_id,
                            order_food.fd_id,
                            order_food.state_id,
                            order_food.req_txt,
                            order_food.index_fd
                        ]
                    });//sqls push
                }
            }
            for(i2 in sqls){//total money 등록 때문에 
                if(sqls[i2].values[5]&&sqls[i2].values[5].tm==0){
                    sqls[i2].values[5]=robj[sqls[i2].values[0]].total_money;
                }
            }
            db.query(sqls,function(err){
                if(err){
                    cb(null);
                }
                else{
                    var tos={};//(sid)=>order_id
                    for(i2 in robj){//영수증 non쿼리형식 등록
                        var obj=robj[i2];
                        var oid=obj.order_id;
                        tos[i2]=oid;
                        for(j2 in obj.order_foods){//주문건수 카운트 
                            var obj2=obj.order_foods[j2];
                            var fid=obj2.fd_id;
                            delete obj2.fd_id;
                            obj2.food=foods[fid];
                            if(!fdata[fid])
                                fdata[fid]={
                                    oCount:0,//주문건수
                                    cArr:{},//클릭한 id 배열
                                }
                            fdata[fid].oCount++;
                            //orderFoodList.in(oid,fid);
                        }
                        var aid=obj.buy_ac_id;//구매자
                        obj.name=baskets[aid].name;
                        receipts.in(oid,obj);
                        
                        //console.log("1단계 진단 끝");
                        //console.log("engine.js receipts 확인차")
                        //console.log(receipts[tos[i2]]);
                    }

                    for(i in guest)//장바구니 초기화
                        guest[i].list={};
                    for(i in users)//장바구니 초기화
                        users[i].list={};
                    for(i in baskets)//장바구니 초기화
                        baskets[i].list={};
                    
                    cb(tos);
                }
            });
        },//tebah order all
        receiptConfirm:function(oid,cb){//확인하기
            var state_id=1;
            var sqls=[
                {
                    sql:"update receipt set state_id=(?) where order_id=(?)",
                    values:[
                        state_id,
                        oid
                    ]
                },
                {
                    sql:"update order_food set state_id=(?) where order_id=(?)",
                    values:[
                        state_id,
                        oid
                    ]
                }
            ]
            db.query(sqls,function(err){
                if(err)
                    cb(err);
                else{
                    receipts.state(oid,state_id);
                    cb(null);
                }
            });
        },
        my_receipt:function(req){//내 영수증들 보여주기
            var aid=acid(req);
            return receipts.my(aid,[0,20,10]);//ac_id ,state_id
        },
        receipt:function(oid){//
            return receipts.view(oid);
        },
        receiptCheck:function(req,oid){//내 영수증인지 확인
            var aid=acid(req);
            var obj=receipts.view(oid);
            return (obj&&obj.buyer.ac_id==aid);
        },
        receiptFoods:function(oid,cb){//영수증에 포함된 음식들 
            var sql="select * from order_food where order_id=(?)"
            var values=[
                oid
            ];
            db.select(sql,values,function(err,rows){
                if(err)
                    cb(null);
                else{
                    for(i in rows){
                        var sh=shops[receipts.view(oid).sh_id];
                        var obj=rows[i];
                        if(users[obj.ac_id]){
                            obj.user={...users[obj.ac_id]};
                        }
                        else{
                            obj.user={...guest[obj.ac_id]};
                        }
                        obj.shop={...sh};
                        obj.food=foods[obj.fd_id];
                        var stateStr={
                            20:"요리 시작",
                            30:"요리 중..",
                            40:"요리 완료",
                        }
                        obj.state_id=stateStr[obj.state_id];
                        delete obj.user.list;//주문목록 삭제
                        delete obj.shop.foods;//상점 음식 목록 삭제
                        delete obj.ac_id;
                        delete obj.fd_id;
                    }
                    cb(rows);
                }
            });
        },
        ShopReceiptInfo:function(sid){//상점 영수증 정보
            var result=[];
            for(i in receipts.obj){
                var obj={...receipts.view(i)};
                if(obj.sh_id==sid){
                    var stid=obj.state_id;
                    switch(stid){
                        case 1:
                        case 11:
                        case 111:
                            obj={
                                order_id:obj.order_id,
                                state_id:obj.state_id
                            }
                        break;
                        default:
                        break;
                    }
                    //var aid=obj.buy_ac_id;
                    //obj.buyer=members[aid]
                    //delete obj.ac_id;
                    result.push(obj);
                }
            }

            return result;//receipts.shop(sid);
        },
        receiptShop:function(sid,cb){//상점에 주문한 음식들 확인
            var sql="select * from order_food a left join receipt b"
            +" on a.order_id = b.order_id where b.sh_id=(?)";
            values=[
                sid
            ];
            db.select(sql,values,function(err,rows){
                if(err){
                    console.log(err);
                    cb(null);
                }
                else{
                    for(i in rows){
                        var aid=rows[i].buy_ac_id;
                        var name=aid;
                        if(users[aid])
                            name=users[aid].name;
                        else if(guest[aid])
                            name=guest[aid].name
                        rows[i].buy_name=name;
                    }
                    cb(rows);
                }
            });//select from food      
        },
        fDataClick:function(req){
            var aid=acid(req);
            var fid=req.body.fid;
            if(!fdata[fid]){
                fdata[fid]={
                    oCount:0,//주문건수
                    cArr:{},//클릭한 id 배열
                }
            }
            fdata[fid].cArr[aid]=null;
            return fdata[fid];
        },
        profileUpdate:function(req,cb){
            var aid=acid(req);
            var sql="update member set "
            +"name=(?),nick_name=(?),tel=(?),jender=(?),birthday=(?) "
            +"where ac_id=(?)"
            var values=[
                req.body.name,
                req.body.nick_name,
                req.body.tel,
                req.body.jender,
                req.body.birthday,
                aid,
            ]
            db.add(sql,values,function(err){
                if(err)
                    cb(null);
                else{
                    users[aid].name=req.body.name;
                    users[aid].nick_name=req.body.nick_name;
                    users[aid].tel=req.body.tel;
                    users[aid].jender=req.body.jender;
                    users[aid].birthday=req.body.birthday;
                    users[aid].basket.name=req.body.name;
                    cb(users[aid]);
                }
            });
        },//profileupdate 
        ipEnrollment:function(req){//ip 등록
            var ip=ipfx(req);
            var aid=acid(req);
            ipArr[ip]=aid;
        },
        ipSearching:function(req){//index ip => ac_id
            //console.log("engine ip searching");
            //console.log(ipfx(req));
            var ip=ipfx(req);
            return (ipArr[ip])?ipArr[ip]:ip;
        },
        startCook:function(oid,cb){
            /* var rcp=receipts[oid];
            var list=rcp.order_foods;
            for(i in list){
            } */
            var state_id=20;
            var sqls=[
                {
                    sql:"update order_food set state_id=(?) where order_id=(?)",
                    values:[
                        state_id,
                        oid
                    ]
                },
                {
                    sql:"update receipt set state_id=(?) where order_id=(?)",
                    values:[
                        state_id,
                        oid
                    ]
                }
            ];
            db.query(sqls,function(err){
                if(err)console.log(err);
                else{
                    receipts.state(oid,state_id);
                    cb(receipts.view(oid));
                }
            });
        },//start cook
        Cooked:function(oid,index_fd,cb){
            var state_id=40;
            var sqls=[
                {
                    sql:"update order_food set state_id=(?) where order_id=(?) and index_fd=(?)",
                    values:[
                        state_id,
                        oid,
                        index_fd
                    ]
                }
            ];
            db.query(sqls,function(err){
                if(err)console.log(err);
                else{
                    receipts.stateFood(oid,index_fd,state_id);
                    cb(receipts.view(oid));
                }
            });
        },//cooked
        serving:function(oid,cb){
            var sql="update receipt set state_id=(?) where order_id=(?)"
            var values=[
                10,
                oid
            ]
            db.add(sql,values,function(err){
                if(err)console.log(err)
                else{
                    receipts.obj[oid].state_id=10;
                    cb(receipts.view(oid));
                }
            });
        },//serving
        T:team,//team
        Member:users,
    }
}