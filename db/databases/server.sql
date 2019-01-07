PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE account
(
ac_id varchar(100) primary key,
pwd varchar(100) not null,
salt text not null
);
INSERT INTO account VALUES('123','U4FcAqeB6vUg8UWPM/GkHmiC8xzjV6mVJboD5zoZD1osWXz5fnaQ8mXiO+zG3vm07utI41Kj8Dgw/glq+CMQMA==','aJTRiRCvdUzG');
INSERT INTO account VALUES('k','63wsmstUQyYYT4p+RmOdtD4g9HxcELD/le9JyBFKE11t/9DJv+x92aGfXk9vn7kEJXgvanzkhS/RlFClnd+SiQ==','PiMZGBcRIBAM');
INSERT INTO account VALUES('l','1uUYPjhFWeUkAfnaCXHqRU2z0cs6rhoXkDuOSz5Au+TxW5UiwGwiR4q9NM4fcOD15XVMxim/dLq1rALLGxqvyg==','jMQLLtbvZTvI');
INSERT INTO account VALUES('j','WW2i8wAYf1+zKjL14tRORXNo8WJFLFukYSK3sUBw1ha1Bc8mu5PulmBY4kGTi1w5OVteOXZAa70bsl4J2sBOGQ==','gHKOKQaPSjnZ');
INSERT INTO account VALUES('test','JwbSlCqL69RxYyEJoYSjUrgyhow2MVh8pDrcxnmI69KYK47Tk9EYE50V/3zSD4zfBWjJ9GVD5L+N8nTK7vGC4w==','ymT3ZM8fZ0uM');
INSERT INTO account VALUES('thdl4428','SrFY31DDnzH2+Lkg77QbajDcKFfztlP+n1/Zxd+xp4ylGHMF8EXXB7eMyZkMtRi44w2pPu/H1bEbJsGVA7WNuw==','XQflTGS1R7K7');
INSERT INTO account VALUES('skw332','JnqTXnNul9FgHv0JXUyFcvbCd0Mc/9yeUIxPY4XNg3tR/tXzL3zoRbRbj3ZAlRE2sZwCaETAXwp1dgDaezJUWw==','UEJLTj1lLJs6');
INSERT INTO account VALUES('hyunyongp','UoQ183tlAT7wRajF9MdGxUuQ9qoctoT5deHcZkeQsjaRqwgdBS/9ZCIUuCINk8qfL8RjEPmcP5ice1TU9AJ9uA==','9nh6u2nMfco0');
INSERT INTO account VALUES('star1475','h2gcwEZc/tJ2LPXPx+6UZoS5eb7LnpzLSYFQC+quiPO9NFd82Z/yUy9JvUrQ0ZkC3ivOXi8T+egpUonKpGigYQ==','paTB8td35101');
INSERT INTO account VALUES('Tebahshh','5ZMa3B8jTs+IXWrzBuDiQhumiimvasjHKH8ao7hzXHnsMc40bEkXJIZg9N+Z9G+h5TvoP/ZGBYo8IiYPtQ38FA==','GhzlhE8Ho33r');
INSERT INTO account VALUES('qnals95','5jMQpeezV1o1l9L4Y61JLAzn/e4L5Ms7v4pUPj89VCSoJYsdnIPORJNA0i/3Sc20cpZDmB2e3ayulHjSvm/HkA==','ftMOFHIcfbyC');
INSERT INTO account VALUES('suzy','TAZ2z26gJNDTgpyyP9R2Irp+Tag+96H4tvaV8pcUD6/ESxs4Msb0HURgB16Y9ktfm6dpDPsQsTGcSDpkmqkORw==','mO3pXrzfh25s');
INSERT INTO account VALUES('jhkwon','d3kFE8qTtQGRsb8QPJ7fPkfD5MV1L5ud0UbrQgPEBeUHgakixrBADFg8Pyt2ZSCvDN/BeKxpC13AkLMnQFOlQQ==','BgklRfMyeQ4V');
INSERT INTO account VALUES('kmy0748','cNKLNebnzyGx8Ii9a6vdmvnayT2xiM732ll0Vvv91+QujSk2H8Vgc9P3hOcck0YKpF9oQ2CLzZfILkAq1K6wAw==','sELhw5wzKSsL');
INSERT INTO account VALUES('yi1452','SX75AF1veODlLygNomr4psBAQTmuT48c6XjSFfEnwNN/qNBOR2PCQZH/gKHhZc6lPhfuDRtDx/GuXLGyrEGEuQ==','iGfNPIUFsO1L');
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
INSERT INTO member VALUES('123','123',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('k','김밥나라 사장 ',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('l','롯데형',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('j','자매브로',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('test','123',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('thdl4428','윤소이',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('skw332','손기웅',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('hyunyongp','박현용님',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('star1475','김샛별',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('Tebahshh','허수학 ',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('qnals95','김부민',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('suzy','이수지',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('jhkwon','권지희',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('kmy0748','김민영',NULL,NULL,NULL,NULL,NULL);
INSERT INTO member VALUES('yi1452','이은이',NULL,NULL,NULL,NULL,NULL);
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
sh_id text not null REFERENCES shop(sh_id) ON UPDATE CASCADE on delete cascade,
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
INSERT INTO food VALUES('sh_ESNtjYTY','fd_nQyPseqw','불고기버거',3500,'1534115352499.jpg');
INSERT INTO food VALUES('sh_ESNtjYTY','fd_aQMSYsvz','새우버거',3600,'1534115502266.jpg');
INSERT INTO food VALUES('sh_ESNtjYTY','fd_nwwrIeZH','데리버거',2000,'1534115525719.jpg');
INSERT INTO food VALUES('sh_ESNtjYTY','fd_KIMWlysw','핫크리스피버거',4700,'1534115540587.jpg');
INSERT INTO food VALUES('sh_ESNtjYTY','fd_CbLzIcsl','클래식 치즈버거',4000,'1534115557826.jpg');
INSERT INTO food VALUES('sh_ESNtjYTY','fd_MDlbAAjX','한우불고기',6700,'1534115574789.jpg');
INSERT INTO food VALUES('sh_ESNtjYTY','fd_rWZdkLWd','모짜렐라 인 더 버거',5800,'1534115591603.jpg');
INSERT INTO food VALUES('sh_nuHVeoLU','fd_MhaQmOvl','아메리카노',3000,'1534115631311.jpg');
INSERT INTO food VALUES('sh_nuHVeoLU','fd_QrMAXbsy','카페라떼',3500,'1534115761271.png');
INSERT INTO food VALUES('sh_nuHVeoLU','fd_vIFIfJIl','카라멜마끼아또',3800,'1534115791011.jpg');
INSERT INTO food VALUES('sh_nuHVeoLU','fd_DqIZxrKB','카페모카',3800,'1534115828220.jpg');
INSERT INTO food VALUES('sh_nuHVeoLU','fd_nYauFVsJ','딸기스무디',4000,'1534115858946.png');
INSERT INTO food VALUES('sh_nuHVeoLU','fd_zHQTbSHm','블루스무디',4000,'1534115890952.png');
INSERT INTO food VALUES('sh_KYWZujZY','fd_jxiHqLIm','볶음밥',2000,'1534117012108.PNG');
INSERT INTO food VALUES('sh_KYWZujZY','fd_acZnzVlu','맥주',4000,'1534117069171.jpg');
INSERT INTO food VALUES('sh_KYWZujZY','fd_lsbOnPsf','소주',3000,'1534117091427.jpg');
INSERT INTO food VALUES('sh_KYWZujZY','fd_TjcfchDe','음료수',1000,'1534117111534.jpg');
INSERT INTO food VALUES('sh_KYWZujZY','fd_SJyRzDtL','소곱창전골',15000,'1534117195004.PNG');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_LayTsuup','치즈돈까스',5500,'1534205752137.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_bvIgTaqq','등심돈까스',5000,'1534205796389.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_jIoFbCNn','회막국수',8000,'1534205860297.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_qeURULNg','막국수',7000,'1534205897761.jpg');
INSERT INTO food VALUES('sh_yJTVkCJv','fd_jGuuhQzU','돌솥비빔밥',6000,'1534205969370.jpg');
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
INSERT INTO order_state VALUES(0,'손님 : 주문접수');
INSERT INTO order_state VALUES(1,'손님 : 음식받음 (완료)');
INSERT INTO order_state VALUES(10,'가게 : 음식건넴 (완료)');
INSERT INTO order_state VALUES(20,'가게(주방) : 요리시작');
INSERT INTO order_state VALUES(30,'가게(주방) : 요리중..');
INSERT INTO order_state VALUES(40,'가게(주방) : 요리완료');
INSERT INTO order_state VALUES(100,'결제 : 완료');
CREATE TABLE receipt
(
sh_id text not null references shop(sh_id) on update cascade on delete cascade,
buy_ac_id varchar(100) not null references member(ac_id) on update cascade on delete cascade,
order_id char(14) primary key,
state_id integer not null references order_state(state_id) on update cascade on delete cascade,
order_date text not null,
total_money integer not null,
pay_money integer not null
);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA211.36.134.71','order_tnzkyhaw',1,'2018-8-13 00:20:37',5500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_mRLkvioV',1,'2018-8-13 00:21:10',4000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.39.146.86','order_PBAsNWRi',1,'2018-8-13 00:23:33',19000,0);
INSERT INTO receipt VALUES('sh_ESNtjYTY','AAffffA211.36.134.71','order_ymLQZKOF',1,'2018-8-13 00:24:30',35006700,0);
INSERT INTO receipt VALUES('sh_KYWZujZY','AAffffA211.36.134.71','order_IwReXXjg',1,'2018-8-13 00:25:06',60000,0);
INSERT INTO receipt VALUES('sh_nuHVeoLU','AAffffA211.36.134.71','order_WexsJuAy',1,'2018-8-13 00:25:46',300038004000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA211.36.134.71','order_XZeHNvMk',1,'2018-8-13 00:26:35',13500,0);
INSERT INTO receipt VALUES('sh_KYWZujZY','AAffffA223.39.146.86','order_eAEEHRVF',1,'2018-8-13 00:33:44',35000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA211.36.134.71','order_hLuvQZXQ',1,'2018-8-13 00:34:30',2000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_JzdSGhdp',1,'2018-8-13 05:54:20',6000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_MMmeatfc',1,'2018-8-13 06:43:11',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_QTIMiDwn',1,'2018-8-14 00:03:56',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_JQdRRwnt',1,'2018-8-14 00:04:59',4000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA203.226.207.166','order_tlShKxqG',1,'2018-8-14 00:22:49',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_DoDJKoyU',1,'2018-8-14 00:30:56',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.39.139.205','order_cPGXtqTd',1,'2018-8-14 01:06:02',6500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.39.151.196','order_mjvjFSNA',1,'2018-8-14 01:07:49',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','kimtest','order_uwxVUmlh',1,'2018-8-14 01:07:56',2000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA110.70.15.241','order_tubpqTRO',1,'2018-8-14 01:07:56',6500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.39.139.249','order_kZHHPOZl',1,'2018-8-14 01:07:56',5500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_NlgoZRXw',1,'2018-8-14 01:07:56',5500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA39.7.46.15','order_rFECVRSL',1,'2018-8-14 01:07:56',6500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','kimtest','order_fMdALEeO',1,'2018-8-14 01:10:24',7000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','kimtest','order_CImQuGlh',1,'2018-8-14 01:12:53',6000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','kimtest','order_hzUmDAFA',1,'2018-8-14 01:18:03',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_fgUDGnwI',1,'2018-8-14 01:39:49',3500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA39.7.46.15','order_wwtRTVUw',1,'2018-8-14 06:04:50',11500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA203.226.207.166','order_KouZMhXt',1,'2018-8-14 06:05:57',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','star1475','order_l72vequU',1,'(UTC+9)2018-8-16 10:08:55',77500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.62.222.133','order_aEx3RZw2',1,'(UTC+9)2018-8-16 10:11:14',16000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA211.36.146.57','order_hT4jgx1P',1,'(UTC+9)2018-8-16 10:51:59',8000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_5pELT2KZ',1,'(UTC+9)2018-8-16 14:41:01',6500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_WEY7b2T0',1,'(UTC+9)2018-8-16 14:41:43',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA222.118.173.37','order_7Nq2LQAj',1,'(UTC+9)2018-8-16 22:10:39',46500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','star1475','order_bEtG7sgf',1,'(UTC+9)2018-8-17 09:17:49',10000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','jhkwon','order_U4tgxD8v',1,'(UTC+9)2018-8-17 09:29:59',25500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA203.226.207.138','order_y1qRNilj',1,'(UTC+9)2018-8-17 09:52:12',6500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA175.223.14.21','order_bqkPhaxd',1,'(UTC+9)2018-8-17 09:52:44',5500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_3QlmBI58',1,'(UTC+9)2018-8-17 10:19:19',66500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_GpSn6eCR',1,'(UTC+9)2018-8-17 15:12:26',53000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.33.181.218','order_mCo56zIz',1,'(UTC+9)2018-8-18 07:33:27',5000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_1FFghae6',1,'(UTC+9)2018-8-18 10:08:28',36000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA223.33.184.246','order_FgqdWt29',1,'(UTC+9)2018-8-20 15:12:32',114000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_oy4d1Jdm',1,'(UTC+9)2018-8-20 15:14:14',15000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA211.36.134.185','order_dS4sE4hb',1,'(UTC+9)2018-8-21 08:41:51',43500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','k','order_T9X9vPt7',1,'(UTC+9)2018-8-21 11:07:29',39500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_WPymdCi7',1,'(UTC+9)2018-8-21 11:08:34',3000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','hyunyongp','order_GwLQSqfN',1,'(UTC+9)2018-8-22 07:51:17',32500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_4exMwynw',1,'(UTC+9)2018-8-22 10:15:38',38000,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','AAffffA106.243.18.93','order_RGWveWX1',1,'(UTC+9)2018-8-22 10:16:12',6500,0);
INSERT INTO receipt VALUES('sh_yJTVkCJv','star1475','order_ktWQO0yz',1,'(UTC+9)2018-8-23 10:22:49',75000,0);
CREATE TABLE order_food
(
order_id char(14) not null references receipt(order_id) on update cascade on delete cascade,
ac_id char(11) not null references member(ac_id) on update cascade on delete cascade,
fd_id char(11) not null references food(fd_id) on update cascade on delete cascade,
state_id integer not null references order_state(state_id) on update cascade on delete cascade,
req_txt text
, index_fd integer);
INSERT INTO order_food VALUES('order_QTIMiDwn','#guest','fd_NFfunHVL',1,NULL,1);
INSERT INTO order_food VALUES('order_JQdRRwnt','#guest','fd_bOSbRIIk',1,NULL,1);
INSERT INTO order_food VALUES('order_tlShKxqG','#guest','fd_KaoraDoa',1,NULL,1);
INSERT INTO order_food VALUES('order_DoDJKoyU','#guest','fd_KaoraDoa',1,NULL,1);
INSERT INTO order_food VALUES('order_cPGXtqTd','#guest','fd_yYpXJgWd',1,NULL,1);
INSERT INTO order_food VALUES('order_mjvjFSNA','#guest','fd_JoWLDVYe',1,NULL,1);
INSERT INTO order_food VALUES('order_uwxVUmlh','#guest','fd_TslGifQG',1,NULL,1);
INSERT INTO order_food VALUES('order_tubpqTRO','#guest','fd_yYpXJgWd',1,NULL,1);
INSERT INTO order_food VALUES('order_kZHHPOZl','#guest','fd_LayTsuup',1,NULL,1);
INSERT INTO order_food VALUES('order_NlgoZRXw','#guest','fd_LayTsuup',1,NULL,1);
INSERT INTO order_food VALUES('order_rFECVRSL','#guest','fd_yYpXJgWd',1,NULL,1);
INSERT INTO order_food VALUES('order_fMdALEeO','#guest','fd_qeURULNg',1,NULL,1);
INSERT INTO order_food VALUES('order_CImQuGlh','#guest','fd_RuiUlLVe',1,NULL,1);
INSERT INTO order_food VALUES('order_CImQuGlh','#guest','fd_RuiUlLVe',1,NULL,1);
INSERT INTO order_food VALUES('order_hzUmDAFA','#guest','fd_KaoraDoa',1,NULL,1);
INSERT INTO order_food VALUES('order_fgUDGnwI','#guest','fd_CpCgXhzs',1,NULL,1);
INSERT INTO order_food VALUES('order_wwtRTVUw','#guest','fd_nIhKYSpy',1,NULL,1);
INSERT INTO order_food VALUES('order_wwtRTVUw','#guest','fd_aidmcMjI',1,NULL,1);
INSERT INTO order_food VALUES('order_KouZMhXt','#guest','fd_KaoraDoa',1,NULL,1);
INSERT INTO order_food VALUES('order_l72vequU','thdl4428','fd_uSTiiBGT',1,'윤소이',1);
INSERT INTO order_food VALUES('order_l72vequU','thdl4428','fd_CwNCWyLD',1,'윤소이',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA211.36.146.57','fd_LayTsuup',1,'김부민',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA106.243.18.93','fd_nIhKYSpy',1,'이윤성',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA39.7.57.180','fd_LayTsuup',1,'정재미',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA223.39.141.191','fd_nIhKYSpy',1,'김미옥',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA39.7.28.57','fd_qeURULNg',1,'박진희',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA39.7.28.57','fd_QjNHRejV',1,'박진희',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA211.36.158.150','fd_yYpXJgWd',1,'김린아',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA223.39.140.116','fd_RvAgsSOz',1,'no.11',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA223.39.150.72','fd_gUPsDxJJ',1,'no.10',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA117.111.1.68','fd_nIhKYSpy',1,'최진숙',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA223.62.222.133','fd_bvIgTaqq',1,'no.13',1);
INSERT INTO order_food VALUES('order_l72vequU','AAffffA223.62.222.133','fd_QjNHRejV',1,'no.13',1);
INSERT INTO order_food VALUES('order_l72vequU','star1475','fd_bOSbRIIk',1,'김샛별',1);
INSERT INTO order_food VALUES('order_aEx3RZw2','AAffffA223.62.222.133','fd_CwNCWyLD',0,'안진욱+알바2',1);
INSERT INTO order_food VALUES('order_aEx3RZw2','AAffffA223.62.222.133','fd_bOSbRIIk',0,'안진욱+알바2',1);
INSERT INTO order_food VALUES('order_aEx3RZw2','AAffffA223.62.222.133','fd_QjNHRejV',0,'안진욱+알바2',1);
INSERT INTO order_food VALUES('order_aEx3RZw2','AAffffA223.62.222.133','fd_bvIgTaqq',0,'안진욱+알바2',1);
INSERT INTO order_food VALUES('order_hT4jgx1P','AAffffA211.36.146.57','fd_TslGifQG',1,'김부민 + 허상무님',1);
INSERT INTO order_food VALUES('order_hT4jgx1P','skw332','fd_jGuuhQzU',1,'손기웅',1);
INSERT INTO order_food VALUES('order_5pELT2KZ','hyunyongp','fd_yYpXJgWd',1,'박현용님',1);
INSERT INTO order_food VALUES('order_WEY7b2T0','hyunyongp','fd_KaoraDoa',1,'박현용님',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','AAffffA106.243.18.93','fd_LayTsuup',1,'이윤성',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','AAffffA39.7.28.57','fd_yYpXJgWd',1,'박진희',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','AAffffA39.7.28.57','fd_bOSbRIIk',1,'박진희',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','AAffffA117.111.1.68','fd_RvAgsSOz',1,'최진숙',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','hyunyongp','fd_yYpXJgWd',1,'박현용님',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','hyunyongp','fd_KaoraDoa',1,'박현용님',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','hyunyongp','fd_RuiUlLVe',1,'박현용님',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','hyunyongp','fd_TslGifQG',1,'박현용님',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','hyunyongp','fd_TslGifQG',1,'박현용님',1);
INSERT INTO order_food VALUES('order_7Nq2LQAj','AAffffA223.39.141.199','fd_qeURULNg',1,'김미옥',1);
INSERT INTO order_food VALUES('order_bEtG7sgf','star1475','fd_KaoraDoa',1,'김샛별',1);
INSERT INTO order_food VALUES('order_bEtG7sgf','qnals95','fd_KaoraDoa',1,'김부민',1);
INSERT INTO order_food VALUES('order_U4tgxD8v','thdl4428','fd_CwNCWyLD',1,'윤소이',1);
INSERT INTO order_food VALUES('order_U4tgxD8v','thdl4428','fd_uSTiiBGT',1,'윤소이',1);
INSERT INTO order_food VALUES('order_U4tgxD8v','suzy','fd_XLCFPPYX',1,'이수지',1);
INSERT INTO order_food VALUES('order_U4tgxD8v','AAffffA175.223.30.183','fd_QjNHRejV',1,'정재미',1);
INSERT INTO order_food VALUES('order_U4tgxD8v','AAffffA175.223.30.183','fd_RuiUlLVe',1,'정재미',1);
INSERT INTO order_food VALUES('order_U4tgxD8v','jhkwon','fd_yYpXJgWd',1,'권지희',1);
INSERT INTO order_food VALUES('order_y1qRNilj','AAffffA203.226.207.138','fd_yYpXJgWd',0,'안진욱',1);
INSERT INTO order_food VALUES('order_bqkPhaxd','AAffffA175.223.14.21','fd_LayTsuup',0,'no.62',1);
INSERT INTO order_food VALUES('order_3QlmBI58','AAffffA106.243.18.93','fd_gUPsDxJJ',1,'김린아',1);
INSERT INTO order_food VALUES('order_3QlmBI58','hyunyongp','fd_aidmcMjI',1,'박현용님',1);
INSERT INTO order_food VALUES('order_3QlmBI58','hyunyongp','fd_gUPsDxJJ',1,'박현용님',1);
INSERT INTO order_food VALUES('order_3QlmBI58','hyunyongp','fd_nIhKYSpy',1,'박현용님',1);
INSERT INTO order_food VALUES('order_3QlmBI58','hyunyongp','fd_QjNHRejV',1,'박현용님',1);
INSERT INTO order_food VALUES('order_3QlmBI58','hyunyongp','fd_KaoraDoa',1,'박현용님',1);
INSERT INTO order_food VALUES('order_3QlmBI58','hyunyongp','fd_nIhKYSpy',1,'박현용님',1);
INSERT INTO order_food VALUES('order_3QlmBI58','AAffffA211.246.68.163','fd_jGuuhQzU',1,'남이윤씨',1);
INSERT INTO order_food VALUES('order_3QlmBI58','AAffffA211.246.68.163','fd_gUPsDxJJ',1,'남이윤씨',1);
INSERT INTO order_food VALUES('order_3QlmBI58','AAffffA211.246.68.163','fd_KaoraDoa',1,'남이윤씨',1);
INSERT INTO order_food VALUES('order_3QlmBI58','AAffffA117.111.5.145','fd_aidmcMjI',1,'최진숙',1);
INSERT INTO order_food VALUES('order_3QlmBI58','AAffffA117.111.5.145','fd_aidmcMjI',1,'최진숙',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA223.39.140.116','fd_RvAgsSOz',1,'no.11',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','hyunyongp','fd_KaoraDoa',1,'박현용님',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA211.246.68.163','fd_KaoraDoa',1,'남이윤씨',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA211.246.68.163','fd_qeURULNg',1,'남이윤씨',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA211.246.68.163','fd_LayTsuup',1,'남이윤씨',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA117.111.5.145','fd_DLVfOLsZ',1,'최진숙',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','kmy0748','fd_mKojslmz',1,'김민영',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA223.62.222.86','fd_LayTsuup',1,'이상선 이은이',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA223.62.222.86','fd_NFfunHVL',1,'이상선 이은이',1);
INSERT INTO order_food VALUES('order_GpSn6eCR','AAffffA223.39.145.212','fd_RuiUlLVe',1,'no.77',1);
INSERT INTO order_food VALUES('order_mCo56zIz','AAffffA223.33.181.218','fd_KaoraDoa',0,'no.111',1);
INSERT INTO order_food VALUES('order_1FFghae6','hyunyongp','fd_KaoraDoa',1,'박현용님',1);
INSERT INTO order_food VALUES('order_1FFghae6','hyunyongp','fd_TslGifQG',1,'박현용님',1);
INSERT INTO order_food VALUES('order_1FFghae6','hyunyongp','fd_TslGifQG',1,'박현용님',1);
INSERT INTO order_food VALUES('order_1FFghae6','hyunyongp','fd_NFfunHVL',1,'박현용님',1);
INSERT INTO order_food VALUES('order_1FFghae6','hyunyongp','fd_TslGifQG',1,'박현용님',1);
INSERT INTO order_food VALUES('order_1FFghae6','AAffffA39.7.46.75','fd_QjNHRejV',1,'박진희',1);
INSERT INTO order_food VALUES('order_1FFghae6','AAffffA223.62.179.212','fd_bOSbRIIk',1,'이상선',1);
INSERT INTO order_food VALUES('order_1FFghae6','yi1452','fd_CwNCWyLD',1,'이은이',1);
INSERT INTO order_food VALUES('order_1FFghae6','yi1452','fd_FWOgclHB',1,'이은이',1);
INSERT INTO order_food VALUES('order_1FFghae6','AAffffA223.62.179.72','fd_FWOgclHB',1,'no.122',1);
INSERT INTO order_food VALUES('order_1FFghae6','AAffffA223.62.179.72','fd_CwNCWyLD',1,'no.122',1);
INSERT INTO order_food VALUES('order_FgqdWt29','thdl4428','fd_CwNCWyLD',0,'윤소이',1);
INSERT INTO order_food VALUES('order_FgqdWt29','thdl4428','fd_QjNHRejV',0,'윤소이',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA106.243.18.93','fd_nIhKYSpy',0,'김린아',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA106.243.18.93','fd_gUPsDxJJ',0,'김린아',1);
INSERT INTO order_food VALUES('order_FgqdWt29','star1475','fd_KaoraDoa',0,'김샛별',1);
INSERT INTO order_food VALUES('order_FgqdWt29','hyunyongp','fd_RvAgsSOz',0,'박현용님',1);
INSERT INTO order_food VALUES('order_FgqdWt29','suzy','fd_gUPsDxJJ',0,'이수지',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA175.223.14.21','fd_nIhKYSpy',0,'오민우',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA117.111.7.174','fd_TslGifQG',0,'no.183',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA117.111.7.174','fd_TslGifQG',0,'no.183',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA117.111.7.174','fd_CwNCWyLD',0,'no.183',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA39.7.46.68','fd_yYpXJgWd',0,'나미윤',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA39.7.46.68','fd_BhIyfkem',0,'나미윤',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA39.7.46.68','fd_CwNCWyLD',0,'나미윤',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA117.111.17.236','fd_AfKJFCgY',0,'no.182',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA211.36.134.231','fd_RuiUlLVe',0,'no.184',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA211.36.149.72','fd_gUPsDxJJ',0,'최진숙 ',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA223.33.160.166','fd_nIhKYSpy',0,'김미옥',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA223.62.215.78','fd_yYpXJgWd',0,'이상선',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA223.62.215.78','fd_LayTsuup',0,'이상선',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA175.223.45.234','fd_KaoraDoa',0,'정재미',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA211.36.150.249','fd_RvAgsSOz',0,'no.193',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA223.62.215.235','fd_jGuuhQzU',0,'no.195',1);
INSERT INTO order_food VALUES('order_FgqdWt29','AAffffA223.33.184.246','fd_gUPsDxJJ',0,'no.179',1);
INSERT INTO order_food VALUES('order_oy4d1Jdm','hyunyongp','fd_CwNCWyLD',1,'박현용님',1);
INSERT INTO order_food VALUES('order_oy4d1Jdm','hyunyongp','fd_gUPsDxJJ',1,'박현용님',1);
INSERT INTO order_food VALUES('order_oy4d1Jdm','hyunyongp','fd_gUPsDxJJ',1,'박현용님',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','hyunyongp','fd_KaoraDoa',0,'박현용님',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA39.7.28.205','fd_BhIyfkem',0,'눼미윤',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA39.7.28.205','fd_CwNCWyLD',0,'눼미윤',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA39.7.28.205','fd_bOSbRIIk',0,'눼미윤',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA117.111.7.228','fd_tHwkTcXY',0,'no.231',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA117.111.17.105','fd_KaoraDoa',0,'no.228',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA211.36.133.25','fd_aidmcMjI',0,'최진숙',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA175.223.27.211','fd_jGuuhQzU',0,'정재미',1);
INSERT INTO order_food VALUES('order_dS4sE4hb','AAffffA211.36.134.185','fd_yYpXJgWd',0,'이윤성',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','thdl4428','fd_jGuuhQzU',1,'윤소이',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','star1475','fd_CpCgXhzs',1,'김샛별',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','suzy','fd_yYpXJgWd',1,'이수지',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','AAffffA175.223.14.21','fd_LayTsuup',1,'오민우',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','AAffffA211.36.150.249','fd_fESyzRYW',1,'no.193',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','AAffffA211.36.150.249','fd_TslGifQG',1,'no.193',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','AAffffA211.36.134.227','fd_RvAgsSOz',1,'no.235',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','AAffffA223.33.184.28','fd_CwNCWyLD',1,'no.239',1);
INSERT INTO order_food VALUES('order_T9X9vPt7','AAffffA223.33.184.28','fd_fESyzRYW',1,'no.239',1);
INSERT INTO order_food VALUES('order_WPymdCi7','AAffffA106.243.18.93','fd_RuiUlLVe',1,'이보배',1);
INSERT INTO order_food VALUES('order_GwLQSqfN','hyunyongp','fd_RvAgsSOz',1,'박현용님',1);
INSERT INTO order_food VALUES('order_GwLQSqfN','AAffffA203.226.207.221','fd_KaoraDoa',1,'no.250',1);
INSERT INTO order_food VALUES('order_GwLQSqfN','AAffffA203.226.207.221','fd_nIhKYSpy',1,'no.250',1);
INSERT INTO order_food VALUES('order_GwLQSqfN','AAffffA203.226.207.221','fd_RvAgsSOz',1,'no.250',1);
INSERT INTO order_food VALUES('order_GwLQSqfN','AAffffA203.226.207.221','fd_RvAgsSOz',1,'no.250',1);
INSERT INTO order_food VALUES('order_GwLQSqfN','AAffffA203.226.207.221','fd_yYpXJgWd',1,'no.250',1);
INSERT INTO order_food VALUES('order_4exMwynw','AAffffA106.243.18.93','fd_gUPsDxJJ',1,'김린아',1);
INSERT INTO order_food VALUES('order_4exMwynw','star1475','fd_KaoraDoa',1,'김샛별',1);
INSERT INTO order_food VALUES('order_4exMwynw','hyunyongp','fd_KaoraDoa',1,'박현용님',1);
INSERT INTO order_food VALUES('order_4exMwynw','AAffffA175.223.14.21','fd_aidmcMjI',1,'오민우',1);
INSERT INTO order_food VALUES('order_4exMwynw','AAffffA211.36.158.159','fd_XLCFPPYX',1,'최진숙 ',1);
INSERT INTO order_food VALUES('order_4exMwynw','AAffffA223.39.152.22','fd_RvAgsSOz',1,'김미옥',1);
INSERT INTO order_food VALUES('order_4exMwynw','AAffffA223.62.179.134','fd_yYpXJgWd',1,'no.274',1);
INSERT INTO order_food VALUES('order_RGWveWX1','AAffffA106.243.18.93','fd_yYpXJgWd',1,'이윤성',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','thdl4428','fd_CwNCWyLD',0,'윤소이',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','thdl4428','fd_LayTsuup',0,'윤소이',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA106.243.18.93','fd_LayTsuup',0,'김린아',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA106.243.18.93','fd_CwNCWyLD',0,'김린아',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','star1475','fd_RvAgsSOz',0,'김샛별',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','skw332','fd_RvAgsSOz',0,'손기웅',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','hyunyongp','fd_gUPsDxJJ',0,'박현용님',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','hyunyongp','fd_RvAgsSOz',0,'박현용님',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','suzy','fd_TslGifQG',0,'이수지',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','suzy','fd_XLCFPPYX',0,'이수지',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA175.223.14.21','fd_KaoraDoa',0,'오민우',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA211.36.150.249','fd_RvAgsSOz',0,'no.193',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA211.36.150.249','fd_RvAgsSOz',0,'no.193',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA211.36.150.249','fd_TslGifQG',0,'no.193',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA175.223.27.211','fd_aQwBqpMw',0,'정재미',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA175.223.27.211','fd_RuiUlLVe',0,'정재미',1);
INSERT INTO order_food VALUES('order_ktWQO0yz','AAffffA223.39.141.85','fd_KaoraDoa',0,'안진욱',1);
CREATE TABLE team(
t_id text primary key,
t_name text not null,
master_ac_id text not null
);
CREATE TABLE team_member(
t_id text not null references team(t_id) on update cascade on delete cascade,
t_nick_name text,
ac_id text,
grade integer
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('order_state',100);
COMMIT;
