var engine = require('./engine')();
var sckArr={
  obj:{},
  in:function(aid,sckId){
    if(!this.obj[aid])
        this.obj[aid]=[];
    this.obj[aid].push(sckId);
  },
  out:function(aid,sckId){
    var index=this.obj[aid].indexOf(sckId);
    if(index>=0)
      this.obj[aid].splice(index,1);
  }
};//(aid)=>socket.id

module.exports = (io) => {
    io.on('connection', function(socket){ //3
        
      //console.log(socket.id+"::connect");

      var aid=engine.ipSearching(socket.request);
      sckArr.in(aid,socket.id);//로그인 상태에서 socket접속 시도할 경우 소켓아이디가 바뀌는거 대비하기
      //console.log(sckArr.obj);
      //console.log('sck arr 확인');
      /*   
      io.to(socket.id).emit('Existing users',ip[1]);
      //기존 소켓에 count가 0보다 크면 count를 1증가 
      //아니면 새로운 유저 생성 유저생성이 되면 type= 'object'를 return 받음
      if(typeof(custom=((count(socket,0)>0)?count(socket,1):newUser(socket)))=="object"){
        io.to(socket.id).emit('My user',custom);
        io.emit('New user',custom);
      }else{
        var id=socket.request.connection.remoteAddress;
        var index=ip[0].indexOf(id);
        var custom=ip[1][index];
        io.to(socket.id).emit('My user',custom);
      } */
      socket.on('disconnect', function(){
        var aid=engine.ipSearching(socket.request);
        sckArr.out(aid,socket.id);
        //console.log(sckArr.obj);
        //console.log(socket.id+":: disconnect byebye~");
      });
      socket.on('host enter',function(sid){
        var rarr=engine.ShopReceiptInfo(sid);
        //console.log(rarr);
        //console.log('socket 31');
        io.to(socket.id).emit('before receipts',rarr);
      });
      socket.on('order', function(args){//Host 소켓 클라이언트에 뿌려주면 된다.
        
       //console.log("소켓으로 넘어옴 결과는 args 아래와 같음");
       //console.log(args);
        for(i in args){//args={sh_id:order_id}
          var sid=i;
          var oid=args[i];
          var sh=engine.shops(sid);
          var aid=sh.ac_id;//상점 주인 id
          var rcp=engine.receipt(oid);

          for(j in sckArr.obj[aid])
            io.to(sckArr.obj[aid][j]).emit('now receipt',rcp);
        }
      });
      socket.on('cook',function(oid){
        var rcp=engine.receipt(oid);
        var buy_ac_id=rcp.buy_ac_id;
        var sckId=sckArr[buy_ac_id];
        io.to(sckId).emit('cook');
      });
      socket.on('serving',function(oid){
        var rcp=engine.receipt(oid);
        var buy_ac_id=rcp.buy_ac_id;
        var sckId=sckArr[buy_ac_id];
        io.to(sckId).emit('complete');
      });
      /* 
      socket.on('send message', function(text){ //3-3
        var msg = text;
        var id=socket.request.connection.remoteAddress;
        var index=ip[0].indexOf(id);
        ip[1][index].msg=msg;
        io.emit('receive message',id, msg);
      });
      socket.on('change name', function(name){ //3-3
        var id=socket.request.connection.remoteAddress;
        var index=ip[0].indexOf(id);
        (index>=0)?ip[1][index].name=name:-1;
        io.emit('receive name',id, name);
      });
      socket.on('move user', function(px){ //3-3
        var id=socket.request.connection.remoteAddress;
        var index=ip[0].indexOf(id);
        ip[1][index].px=px;
        socket.broadcast.emit('receive move user',id,px);
      }); */
    });
  };