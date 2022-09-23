// 1) DB 모델들 가져오기
const db = require('./models');
const express = require('express');
const app = express();
// 4) env파일 사용
require('dotenv').config();
// // 5) 절대경로 설정
require('better-module-alias')(`${__dirname}`);
// *) HTTP request logging 모듈 불러오기
const morgan = require('morgan');
// *) mysql2 Module 불러오기
const mysql2 = require('mysql2/promise');
// 10) PORT
const PORT = process.env.PORT || 5000;
// 11) DB 테이블 생성(없으면 생성해줌)
db.sequelize.sync().then((response) => {
  console.log('DB sync is completed.');
});

// *) HTTP request log
app.use(morgan('dev'));

// 3) Session 설정(생성)
// const session = require('express-session');
// const { info } = require('./config/db');
// const MySQLStore = require('express-mysql-session')(session);
// const connection = mysql2.createPool(info);
// const sessionStore = new MySQLStore({}, connection);
const session = require('express-session');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 7 * 24 * 60 * 60 * 1000,
});
// 8) 세션을 적용
app.use(
  session({
    // 8-1) 세션 암호화
    secret: process.env.SESSION_SECRET,
    // 8-2) 수정사항이 생기지 않은 세션 요청이 왔을 때 다시 저장할지
    resave: false,
    // 8-3) 세션에 저장할 내역이 없더라도, 세션 저장할지
    saveUninitialized: true,
    // 8-4) 서버가 재시작되어도 세션 유지
    store: sessionStore,
  })
);

sessionStore.sync();

// 4) body에 데이터 담기
app.use(express.json());
// 5) cookie 데이터 받기
// app.use(cookieParser());
// 6) 'Public' Directory에 정적 파일(사진, 이미지)을 위치시키기
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// 7) CORS 허용
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 10) 각 라우터에 인자값을 넘겨주는 것
app.get('/admin', (req, res) => {
  const html = '<h1>Admin Page</h1>';
  res.send(html);
});
app.use('/api', require('./src/api')(db));

// 에러 핸들링
app.use((err, req, res, next) => {
  console.log(err);
  if (req.path.slice(1, 4) === 'api') {
    res.statusCode = err.statusCode || 500;
    res.json({
      message: err.message,
    });
  }
});

// 없는페이지 에러메세지
app.get('*', (req, res) => {
  console.log(`${req.path}: not found`);
  res.send('<h1>No Page is Exists');
  //res.render('error/couldNotFind', { path: req.path });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!!`);
});
