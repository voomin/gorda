PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE account
(
ac_id varchar(100) primary key,
pwd varchar(100) not null
, salt text);
INSERT INTO account VALUES('kimtest','123',NULL);
INSERT INTO account VALUES('lotte','123',NULL);
INSERT INTO account VALUES('jame','123',NULL);
INSERT INTO account VALUES('123','U4FcAqeB6vUg8UWPM/GkHmiC8xzjV6mVJboD5zoZD1osWXz5fnaQ8mXiO+zG3vm07utI41Kj8Dgw/glq+CMQMA==','aJTRiRCvdUzG');
INSERT INTO account VALUES('k','63wsmstUQyYYT4p+RmOdtD4g9HxcELD/le9JyBFKE11t/9DJv+x92aGfXk9vn7kEJXgvanzkhS/RlFClnd+SiQ==','PiMZGBcRIBAM');
INSERT INTO account VALUES('l','1uUYPjhFWeUkAfnaCXHqRU2z0cs6rhoXkDuOSz5Au+TxW5UiwGwiR4q9NM4fcOD15XVMxim/dLq1rALLGxqvyg==','jMQLLtbvZTvI');
INSERT INTO account VALUES('j','WW2i8wAYf1+zKjL14tRORXNo8WJFLFukYSK3sUBw1ha1Bc8mu5PulmBY4kGTi1w5OVteOXZAa70bsl4J2sBOGQ==','gHKOKQaPSjnZ');
CREATE TABLE member
(
ac_id varchar(100) primary key REFERENCES account(ac_id) ON UPDATE CASCADE on delete cascade,
name varchar(100),
nick_name varchar(100),
tel varchar(15),
create_date text,
jender char(1),
birthday text
);
INSERT INTO member VALUES('kimtest','김밥나라사장',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('lotte','롯데형',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('jame','자매브로',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('123','123',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('k','김밥나라 사장 ',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('l','롯데형',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('j','자매브로',NULL,NULL,NULL,NULL,NULL);
CREATE TABLE user_address
(
ac_id varchar(100) not null REFERENCES member(ac_id) ON UPDATE CASCADE on delete cascade,
addr_name varchar(16),
addr_txt text not null,
basic char(1) default 'n'
);
CREATE TABLE health
(
ac_id varchar(100) not null REFERENCES member(ac_id) ON UPDATE CASCADE on delete cascade,
insert_date text,
height integer,
weight integer
);
CREATE TABLE shop
(
ac_id varchar(100) not null REFERENCES member(ac_id) ON UPDATE CASCADE on delete cascade,
sh_id char(11) primary key,
sh_name varchar(100) not null, 
sh_address varchar(100), sh_tel varchar(15)
);
INSERT INTO shop VALUES('k','sh_yJTVkCJv','김밥나라','운동장점','041) 906-8585');
INSERT INTO shop VALUES('l','sh_ESNtjYTY','롯데리아 천안점','충청남도 천안시 서북구 성정동 1117','041-622-5511');
INSERT INTO shop VALUES('l','sh_nuHVeoLU','롯데 커피점','충청남도 천안시 서북구 성정2동 동서대로 154','041-572-7858');
INSERT INTO shop VALUES('j','sh_KYWZujZY','자매곱창 ','충청남도 천안시 서북구 성정2동 646-11','041-572-4168');
CREATE TABLE food
(
sh_id integer not null REFERENCES shop(sh_id) ON UPDATE CASCADE on delete cascade,
fd_id char(11) primary key,
fd_name varchar(100) not null,
fd_price integer not null, 
fd_img_src varchar(25)
);
INSERT INTO food VALUES('sh_yJTVkCJv','fd_TslGifQG','야채김밥',2000,'1533810902036.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_CwNCWyLD','치즈김밥',3000,'1533810921733.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_RuiUlLVe','참치김밥',3000,'1533810950670.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_zCdmKuxc','즉석라볶이',3500,'1533810974894.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_bOSbRIIk','치즈라볶이',4000,'1533811002270.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_uSTiiBGT','치즈떡볶이',4000,'1534078038493.jpg');
INSERT INTO food VALUES('sh_KYWZujZY','fd_iPIHbSfC','돼지곱창 (대)',35000,'1534077813597.png');
INSERT INTO food VALUES('sh_KYWZujZY','fd_BJuWTlbx','돼지곱창 (중)',30000,'1534077836984.png');
INSERT INTO food VALUES('sh_KYWZujZY','fd_GYzUYhmY','돼지곱창 (소)',25000,'1534077855587.png');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_QjNHRejV','우동',4000,'1534078400332.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_FWOgclHB','라면',3000,'1534078421560.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_wXxeQytn','떡라면',3500,'1534078479151.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_CpCgXhzs','치즈라면',3500,'1534078510228.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_BhIyfkem','김치라면',3500,'1534078554918.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_fESyzRYW','짬뽕라면',4000,'1534078581704.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_AfKJFCgY','만두라면',4000,'1534078602539.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_mKojslmz','제육덮밥',6000,'1534078619865.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_aQwBqpMw','쫄면',5000,'1534078650915.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_tHwkTcXY','떡국',5000,'1534078672976.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_JoWLDVYe','만두국',5000,'1534078701449.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_roaHwSPx','떡만두국',5500,'1534078745841.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_DLVfOLsZ','칡물냉면',6000,'1534078767925.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_SKiquyiw','칡비빔냉면',6000,'1534078785419.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_KaoraDoa','김치볶음밥',5000,'1534078811845.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_nIhKYSpy','새우볶음밥',6000,'1534078841669.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_NFfunHVL','순두부백반',5000,'1534078863629.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_XLCFPPYX','된장찌개',5000,'1534078881775.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_aidmcMjI','참치찌개',5500,'1534078940894.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_STTOOpGW','김치찌개',5000,'1534078985050.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_gUPsDxJJ','육개장',6000,'1534079007888.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_yYpXJgWd','갈비탕',6500,'1534079025212.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_ywlxfekZ','다슬기해장국',6000,'1534079039444.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_RvAgsSOz','비빔밥',5000,'1534079058343.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_JIQMMUMs','공기밥',1000,'1534079071686.jpg');
CREATE TABLE cooking_time(
fd_id char(11) not null references food(fd_id) on update cascade on delete cascade,
insert_date text,
time integer
);
CREATE TABLE order_state
(
state_id integer primary key autoincrement,
state text not null
);
CREATE TABLE order_food
(
order_id char(14) not null references receipt(order_id) on update cascade on delete cascade,
fd_id char(11) not null references food(fd_id) on update cascade on delete cascade,
state_id integer not null references order_state(state_id) on update cascade on delete cascade,
req_txt text
);
INSERT INTO order_food VALUES('order_tIZbL8A9','fd_CwNCWyLD',0,NULL);
INSERT INTO order_food VALUES('order_tIZbL8A9','fd_CwNCWyLD',0,NULL);
INSERT INTO order_food VALUES('order_tIZbL8A9','fd_CwNCWyLD',0,NULL);
CREATE TABLE receipt
(
sh_id integer not null references shop(sh_id) on update cascade on delete cascade,
buy_ac_id varchar(100) not null references member(ac_id) on update cascade on delete cascade,
order_id char(14) primary key,
state_id integer not null references order_state(state_id) on update cascade on delete cascade,
order_date text not null,
total_money integer not null,
pay_money integer not null
);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AA1','order_tIZbL8A9',0,'(UTC+9)2018-8-14 23:54:40',9000,0);
CREATE TABLE team(
t_id text primary key,
t_name text not null,
master_ac_id text not null
);
INSERT INTO team VALUES('t_eZcmUNDK','123','123');
CREATE TABLE team_member(
t_id text not null references team(t_id) on update cascade on delete cascade,
t_nick_name text,
ac_id text,
grade integer
);
INSERT INTO team_member VALUES('t_eZcmUNDK','team','j',0);
INSERT INTO team_member VALUES('t_eZcmUNDK','team','j',0);
DELETE FROM sqlite_sequence;
COMMIT;
