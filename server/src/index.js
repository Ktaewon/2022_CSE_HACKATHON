// 1) DB 모델들 가져오기
const db = require('../models');
const express = require('express');
const app = express();
// 4) env파일 사용
require('dotenv').config();
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
// app.use('/api', require('./api')(db));

// 없는페이지 에러메세지
app.get('*', (req, res) => {
  console.log(`${req.path}: not found`);
  res.render('error/couldNotFind', { path: req.path });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
