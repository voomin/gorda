const sqlite3 = require('sqlite3').verbose();
var DB_src='./db/databases/Goreda_demo.db';
module.exports = function () {
  return {
    openCheck: function () {
        let db = new sqlite3.Database(DB_src, (err) => {
          if (err) 
            console.error('sqlite connection error :' + err);
          else 
            console.info('+ sqlite is connected successfully.');
        });
        db.exec("pragma foreign_keys=1");//적용이 되는지 확인 해봐야 한다.
        db.close();
    },
    query:function(sqls,cb){//tran잭션
      let db = new sqlite3.Database(DB_src);
      db.serialize(function(err){
        db.exec("BEGIN");
        for(i in sqls){
          var stmt = db.prepare(sqls[i].sql);
          stmt.run(...sqls[i].values,function(err){
            if(err){
              console.log("err 발생 !! sqls = ");
              console.log(sqls[i]);
              console.log(err);
            }
          });
          stmt.finalize();
        }
        cb(null);
        db.exec("COMMIT");
      });
      db.close();
    },
    add:function(sql,values,cb){//회원가입 및 상점추가
      let db = new sqlite3.Database(DB_src);
      db.run(sql,values, function(err) {
        cb((err)?err:null);
      });
      db.close();
    },
    login:function(sql,values,cb){//아이디확인
      let db = new sqlite3.Database(DB_src);
      db.all(sql,values, function(err,rows) {
        (err)
        ?cb(err,rows)
        :cb(err,rows);
      });
      db.close();
    },
    select: function (sql,values,cb) {//조회
      let db = new sqlite3.Database(DB_src);
      db.all(sql,values,function(err, rows){
        (err)
        ?cb(err,null)
        :cb(err,rows);
      });
      db.close();
    }

  }
};
