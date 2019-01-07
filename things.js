var express = require('express');
var router = express.Router();
var engine = require('./engine')();
var db = require('./db/con_db')();

//[body parser]------------------------------------------------------------------------//
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//------------------------------------------------------------------------------------//
//[session]---------------------------------------------------------------------------//
var session = require('express-session');
router.use(session({
  secret: '9+PF3ku:x9l<2#(%L3..ZJN^{7LXg+}',
  resave: false,
  saveUninitialized: true
}));
//[multer]------------------------------------------------------------------------------------//
var path = require('path');
var multer = require('multer');//이미지 업로드 모듈
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});
//------------------------------------------------------------------------------------//
var memberPage=["/manage","/shop",'/profile'];
router.use(function (req, res, next) {//기본적으로 여기 먼저 거치고 간다.
  if(memberPage.indexOf(req.originalUrl)!=-1)
    if(req.session.user)//허가된자만 memberpage에 접근 가능하다.
      next();
    else
      res.redirect("/");
  else
    next();
});
router.get('/', function(req, res){
  var rows=engine.shops();
  var tos={
    name:(req.session.user)?req.session.user.name:"로그인",
    link:(req.session.user)?"my":"login",
    shops:rows,
    owner:false,//자신의 가게인지 확인
    basket:engine.basket(req),//장바구니
    offline:(req.session.shopIn)?req.session.shopIn.sh_id:null,
    receipts:engine.my_receipt(req)
  }
  res.render('index',tos);
});
router.get('/manage', function(req, res){
  var rows=engine.my_shops(req.session.user.ac_id);
  res.render('manage',{
    name:req.session.user.name,
    link:"my",
    shops:rows
  });
});
router.get('/shop', function(req, res){
  res.render('shop');
});
router.get('/off_shop=*', function(req, res, next){
  var s=req.originalUrl;//url
  var id=s.slice(s.indexOf("=")+1);
  req.session.shopIn={sh_id:id};
  engine.basket(req,"reset");//기존 장바구니 초기화
  res.redirect('/shop='+id);
  console.log("offline shop 접속 시도 ip="+req.connection.remoteAddress);
});
router.get('/shop=*', function(req, res){
  var s=req.originalUrl;//url
  var id=s.slice(s.indexOf("=")+1)
  req.session.selectShopId=id;
  var rows=engine.shops(id);
  var tos={
    name:(req.session.user)?req.session.user.name:"로그인",
    link:(req.session.user)?"my":"login",
    shops:[rows],
    owner:(req.session.user&&req.session.user.ac_id==rows.ac_id),//자신의 가게인지 확인
    basket:engine.basket(req),//장바구니
    offline:(req.session.shopIn)?req.session.shopIn.sh_id:null,
    receipts:engine.my_receipt(req)
  }
  res.render('index',tos);
});
router.get('/kitchen=*', function(req, res){
  var s=req.originalUrl;
  var id=s.slice(s.indexOf("=")+1);//=뒤에있는 id값 가져오기
  var sh=engine.shops(id);
  if(req.session.ac_id==sh.ac_id)
    res.render("kitchen",{
      shop:sh
    })
  /* 
    engine.receiptShop(id,function(rows){// 음식정보랑 주문정보 모두 가져오기
      var ol=[];//order_list
      for(i in rows){
        var fid=rows[i].fd_id;
        var fd=engine.foods(fid);
        ol[fid]=fd;
      }
      res.render("kitchen",{
        shop:sh,
        order:rows,
        foods:ol
      });
    } 
  );//receipt
  */
  else
    res.redirect("/shop="+id);
});
router.get('/receipt=*', function(req, res){
  var s=req.originalUrl;
  var oid=s.slice(s.indexOf("=")+1);//=뒤에있는 id값 가져오기
  if(engine.receiptCheck(req,oid)){
    req.session.selectReceipt=oid;
    var rcp=engine.receipt(oid);//영수증
    engine.receiptFoods(oid,function(rows){
      res.render('receipt',{
        obj:rows
      }); 
    });
  }
  else
    res.redirect("/");

  /* 
  if(req.session.ac_id==sh.ac_id)
    engine.receipt(id,function(rows){
      var ol=[];//order_list
      for(i in rows){
        var fid=rows[i].fd_id;
        var fd=engine.foods(fid);
        ol[fid]=fd;
      }

      res.render("kitchen",{
        shop:sh,
        order:rows,
        foods:ol
      });
    }
  );//receipt
  else
    res.redirect("/shop="+id); */
});
router.get('/OrderCheck', function(req, res){//index에서 최종주문 확인할때,
  var obj=engine.basket(req);
  //console.log("offline shop ?? = "+req.session.shopIn);
  console.log(obj);
  console.log('^^^ things 156 ^^^');
   
  if(Object.keys(obj.list).length>0&&req.session.ac_id){
      res.render('order',{
        basket:obj
      });
  }
  else
    res.redirect('/'); 
});
/* 
router.get('/OrderCheckAll', function(req, res){//전체 주문정보 확인
  var obj=engine.basket(req,"all");
  console.log(obj);
  console.log('things 175');
  if(Object.keys(obj).length!=0)  
    res.render('order',{
        obj:obj
    });
  else
    res.redirect('/');
}); 
*/
router.get('/login', function(req, res){
  res.render('login',{
    status:"gorda"
  });
});
router.get('/logout', function(req, res){
   req.session.destroy(function(err){  
      if(err)
        console.log(err);   
      else  
        res.redirect('/');  
    });  
});
router.get('/signUp', function(req, res){
  res.render('signUp',{
    status:"가입하기"
  });
});
router.get('/profile', function(req, res){
  var arr=req.session.user;
  arr.link="my"
  console.log(arr);
  res.render('profile',arr);
});

router.get('*', function(req, res){//404 page
  console.log("404 not found : url = "+req.originalUrl);
  
});

router.post("/idCheck",urlencodedParser,function(req,res){
  var sql="select ac_id from account where ac_id=(?)";
  var values=[req.body.id];
  db.select(sql,values,function(err,rows){
    if(err) console.log(err);
    else{
      var result=(rows.length==0);
      req.session.idCheck=result;
      res.send(JSON.stringify(result));
    }
  })
});
router.post("/login",urlencodedParser,function(req,res){
  var user={
    id:req.body.id,
    pwd:req.body.pwd
  }/* */
  engine.passwordCheck(user.id,user.pwd,function(check){
    if(check){
        var sql="select"
        +" a.ac_id,a.name,a.nick_name,a.tel,a.create_date,a.jender,a.birthday"
        +" from member a inner join account b on a.ac_id=b.ac_id"
        +" where b.ac_id=(?)";
        var values=[
            user.id
          ];
        db.login(sql,values,function(err,rows){
          if(err||rows.length==0){//실패  
          }else{//성공
            req.session.ac_id=user.id;
            req.session.user=rows[0];
            engine.ipEnrollment(req);//ip등록
            res.redirect("/");
          }//else
        }); //db.login
    }else{
      res.render('login',{
        status:"비밀번호가 틀립니다."
      });
    }
  });//password check
});
router.post("/sign",urlencodedParser,function(req,res){
  var user={
    id:req.body.id,
    pwd:req.body.pwd,
    name:req.body.name,
  }
  var salt=engine.salt();
  engine.password(user.pwd,salt,function(pwd){
    var sqls=[
      {
        sql:'insert into account (ac_id,pwd,salt) values(?,?,?)',
        values:[
          user.id,
          pwd,
          salt
        ]
      },
      {
        sql:"insert into member (ac_id,name) values(?,?)",
        values:[
          user.id,
          user.name
        ]
      }
    ];
    if(req.session.idCheck&&pwd!=null){//사용가능한 아이디인지 확인.
      req.session.idCheck=false;
      db.query(sqls ,function(err){
        engine.signup(user);
        res.render('login',{
          status:"가입 완료"
        });  
      });
    }else{
      res.render('signUp',{
        status:"가입 실패"
      }); 
    }//else
  });//password
});// post sign
router.post("/AddShop",urlencodedParser,function(req,res){
  var shop={
    ac_id:req.session.user.ac_id,
    sh_name:req.body.name,
    sh_address:req.body.address,
    sh_tel:req.body.tel
  }
  engine.shop_add(shop,function(err){
    if(err)//실패
      res.render('shop');
    else//성공
      res.redirect('/manage');
  });
});
router.post("/AddFood", upload.single('img'), (req, res) => {
  var food={
    req_ac_id:req.session.ac_id,
    sh_id:req.session.selectShopId,
    fd_name:req.body.name,
    fd_price:req.body.price,
    fd_img_src:req.file.filename
  }
  engine.food_add(food,function(err){
    if(err)//실패
      console.log(err);
    else//성공
      res.redirect('/shop='+req.session.selectShopId);
  });
});
router.post("/DeleteFood", urlencodedParser, (req, res) => {
  var food={
    req_ac_id:req.session.ac_id,
    sh_id:req.session.selectShopId,
    fd_id:req.body.fd_id
  }
  engine.del(food,function(err){
    if(err)//실패
      console.log(err);
    else//성공
      res.redirect('/shop='+req.session.selectShopId);
  });
});
router.post("/updateFood", upload.single('img'), (req, res) => {
  var fid=req.body.fd_id;
  var src=(req.file&&req.file.filename)?req.file.filename:engine.foods(fid).fd_img_src;
  var food={
    req_ac_id:req.session.ac_id,
    sh_id:req.session.selectShopId,
    fd_id:fid,
    fd_name:req.body.name,
    fd_price:parseInt(req.body.price),
    fd_img_src:src
  }
  engine.food_update(food,function(err){
    if(err)//실패
      console.log(err);
    else//성공
      res.redirect('/shop='+req.session.selectShopId);
  });
});
router.post("/basketAdd", urlencodedParser, (req, res) => {
  var status="add"
  if(req.session.shopIn){//오프라인 매장에 있는 메뉴만 주문할수 있게한다.
    var now_sid=req.session.shopIn.sh_id;
    var fid=req.body.fd_id;
    var fd=engine.foods(fid);
    status=(fd.sh_id==now_sid)?"add":null;
  }
  if(req.session.ac_id){//회원인 사람만 할수 있게
    var arr=engine.basket(req,status);
    res.send(arr);
  }else{
    res.send(false);
  }
});
router.post("/basketMinus", urlencodedParser, (req, res) => {
  var arr=engine.basket(req,"minus");
  res.send(arr);
});
router.post("/basketLocked", urlencodedParser, (req, res) => {
  var locked=req.body.locked;
  var arr;
  if(locked=="true")
    arr=engine.basket(req,"locked");
  else
    arr=engine.basket(req,"unlocked");
  console.log(arr);
  console.log('things 378');
  res.send(arr);
});
router.post("/OrderCheck", urlencodedParser, (req, res) => {//index에서 최종주문 확인할때,
  var args=engine.basket(req);
  var str="";
  var totalM=0;
  var fdCount={};
  for(i in args.list){
    var fd=args.list[i];
    totalM+=fd.fd_price;
    if(!fdCount[fd.fd_id])
      fdCount[fd.fd_id]={
        count:0,
        name:fd.fd_name
      };
    fdCount[fd.fd_id].count++;
  }
  res.send({
    totalM:totalM,
    fdCount:fdCount
  });
  //console.log(args);
  //console.log("^^^ things 373 ^^^");
});
router.post("/shopInfo", urlencodedParser, (req, res) => {
  var arr={...engine.shops(req.body.sh_id)};//adress참조 말고 value값만 복사
  delete arr.foods;
  delete arr.ac_id;
  res.send(JSON.stringify(arr));
});
router.post("/cashPay", urlencodedParser, (req, res) => {//결제하기 
  var obj=engine.basket(req);
  var result=false;
  if(Object.keys(obj.list).length>0){
    engine.order(req,obj.list,function(order_id){
      result=order_id;
      engine.basket(req,"reset");
      res.send(result);
    });
  }else
    res.send(result);
});
router.post("/guestNameChange", urlencodedParser, (req, res) => {
  var name=req.body.name;
  var ip=req.connection.remoteAddress.replace(/\:/gi,"A");
  var result=engine.guestNameChange(ip,name);
  res.send(result);
});
router.post("/teamMake", urlencodedParser, (req, res) => {
  engine.team_add(req,function(err){
    var tos={
      t_name:req.body.t_name,
      Master:req.session.ac_id
    }
    if(err)
      tos={};
    res.send(JSON.stringify(tos));
  });
});
router.post("/team", urlencodedParser, (req, res) => {//내 팀 확인 팀관리 눌렀을때
  
  var aid=req.session.ac_id;
  var tidArr=engine.T.team_id(aid);
  var result=[]
  for(i in tidArr){
    result.push(engine.T.eachView(tidArr[i],aid));
  }
  //console.log(result);
  //console.log('things 442');
  res.send(result);
});
router.post("/teamMore", urlencodedParser, (req, res) => {//팀 더보기 클릭시
  var tid=req.body.team_id;
  console.log('things 452 , tid='+tid);
  var aid=req.session.ac_id;
  var team=engine.T.eachView(tid,aid);
  if(team){
    res.send(engine.T.view(tid));
  }else{
    res.send(false);
  }
});
router.post("/memberSearching", urlencodedParser, (req, res) => {//member 찾기
  var tid=req.body.team_id;
  var aid=req.body.ac_id;
  //초대할수있는 권환 확인하기, 초대 대기상태인지 확인
  var result=engine.T.eachView(tid,aid);
  var name=(engine.Member[aid])?engine.Member[aid].name:null;
  var tos={
    aid:aid,
    name:name,
    invite:true
  }
  if(!result)
    tos.invite=false;
  res.send(tos);
});
router.post("/teamInvite", urlencodedParser, (req, res) => {//초대하기 클릭시
  var tid=req.body.team_id;
  var aid=req.body.ac_id;
  var useAid=req.session.ac_id;
  if(engine.T.eachView(tid,useAid).invite){//초대권환 확인
    engine.T.invite(tid,aid);
    console.log(engine.T.view(tid));
    console.log('things 481');
    res.send(true);
  }else
    res.send(false);
});
router.post("/Joinsuccess", urlencodedParser, (req, res) => {//수락하기
  var tid=req.body.team_id;
  var aid=req.session.ac_id;
  //팀 수락하기 보안성 검토하기
  console.log(tid+" 팀에 "+aid+"가 수락하였습니다. 아직 준비중..");
  //engine.T.join(tid,aid);
  //console.log(engine.T.view(tid));
  //console.log('things 493');
  
});
router.post("/Order", urlencodedParser, (req, res) => {//실제 주문 명령어
  engine.Order(req,function(tos){//tos={sh_id:order_id}
    engine.basket(req,'reset');
    res.send(tos);
  });
});
router.post("/allOrder", urlencodedParser, (req, res) => {
  engine.TebahOrder(req,function(result){
    res.send(result);
  });
});
router.post("/receiptConfirm", urlencodedParser, (req, res) => {//소비자 주문내역 확인버튼 클릭시 발생
  //console.log("dsfasdfe3342");
  //console.log(req.originalUrl);
  var oid=req.session.selectReceipt;
  if(oid){
    engine.receiptConfirm(oid,function(err){
      if(err) console.log(err);
      res.redirect("/");  
    });
  }else
    res.redirect("/");
});
router.post("/fdata", urlencodedParser, (req, res) => {
  var obj=engine.fDataClick(req);
  res.send({
      o:obj.oCount,
      c:Object.keys(obj.cArr).length
    });
});
router.post("/profileUpdate", urlencodedParser, (req, res) => {
  if(req.session.ac_id)
    engine.profileUpdate(req,function(user){

      console.log(user)
      req.session.user=user;
      res.send(user.name);
    });
  else
    res.redirect("/");
});
router.post("/guestBasketCancel", urlencodedParser, (req, res) => {
  if(req.session.ac_id){
    engine.guestBasketCancel(req.body.aid,req.body.oid);
    res.send(true);
  }else
    res.send(false);
});
router.post("/startCook", urlencodedParser, (req, res) => {//요리시작
  var oid=req.body.oid;
  var rcp=engine.receipt(oid);
  var sid=rcp.sh_id;
  var shopHostId=engine.shops(sid).ac_id;
  if(req.session.ac_id==shopHostId){//보안검사 
    engine.startCook(oid,function(rcp){
      res.send(rcp);
    });
  }else{
    res.send(false);
  }
});
router.post("/Cooked", urlencodedParser, (req, res) => {//요리 완료
  var oid=req.body.order_id;
  var rcp=engine.receipt(oid);
  var sid=rcp.sh_id;
  var shopHostId=engine.shops(sid).ac_id;
  if(req.session.ac_id==shopHostId){//보안검사 
    var index_fd=req.body.index_fd;
    engine.Cooked(oid,index_fd,function(rcp){
      res.send(rcp);
    });
  }else{
    res.send(false);
  }
});
router.post("/serving", urlencodedParser, (req, res) => {//음식 주문자에게 건네주기
  var oid=req.body.oid;
  var rcp=engine.receipt(oid);
  var sid=rcp.sh_id;
  var shopHostId=engine.shops(sid).ac_id;
  if(req.session.ac_id==shopHostId){//보안검사 
    var foods=rcp.order_foods;
    console.log("things 512");
    console.log(foods);
    var check=function(){//요리가 다 준비 됬는지 확인.  
      for(i in foods){
        var fd=foods[i];
        if(fd.state_id!=40)
          return false;
      }
      return true;
    }
    if(check()){
      engine.serving(oid,function(rcp){
        res.send(rcp);
      })
    }else{
      res.send(false);
    }
  }else{
    res.send(false);
  }
});
//export this router to use in our index.js
module.exports = router;
