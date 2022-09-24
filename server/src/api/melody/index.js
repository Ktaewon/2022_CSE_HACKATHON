module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper');
  //const checkClientType = require('$base/utils/checkClientType');
  //const signout = require('./function/signout');
  const { melody } = require('./melodyAPI');

  const multer = require('multer');

  //melody 작성
  //audio 파일은 어떻게 받는지?
  router.post(
    '/',
    doAsync(async (req, res) => {
      const {
        title,
        image,
        body,
        deadline,
        hashtags,
        my_instrument,
        need_instrument,
        genre,
      } = req.body;
      console.log(title);
      const user_email = req.session.email;
      const result = await db.Melody.create({
        title,
        image,
        body,
        deadline,
        hashtags,
        my_instrument,
        need_instrument,
        genre,
        user_email,
      });
      if (!result) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(result);
    })
  );

  router.get(
    '/:melody_id',
    doAsync(async (req, res) => {
      const { melody_id } = req.params;
      const melody = await db.Melody.findOne({ where: { id: melody_id } });
      if (!melody) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(melody);
    })
  );

  // TO-DO
  // 메인멜로디 옵션 설정해서 조회
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now().valueOf()}_${file.originalname}`);
    },
  });

  const upload = multer({ storage }).array('uploadFiles');

  //멜로디 파일 업로드
  router.post(
    '/audio/:melody_id', //몇번 포스트에 올릴건지
    upload,
    doAsync(async (req, res) => {
      const { melody_id } = req.params;

      const melody = await db.Melody.findOne({ where: { id: melody_id } });
      if (!melody) {
        res.status(500).send({ message: '에러남' });
      }

      const audio = req.files[0].filename;
      console.log(req.files);

      const result = await db.Melody.update(
        { audio },
        { where: { id: melody_id } }
      );
      console.log('오디오 이름은 : ' + audio);

      if (!result) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(result);
    })
  );

  router.get(
    '/audio/:filepath',
    doAsync(async (req, res) => {
      const { filepath } = req.params;

      console.log('받은 파일 이름은 : ' + filepath);

      const playfile = await db.Melody.findOne({ where: { audio: filepath } });

      console.log('재생할 파일은: ' + playfile); //조회 완료
      console.log('재생할 파일 이름은: ' + playfile.audio); //조회 완료

      if (!playfile) {
        res.status(500).send({ message: '에러남' });
      }

      const myaudio = new Audio(playfile.audio);

      myaudio.play();

      if (!myaudio) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(myaudio);
    })
  );
  return router;
};
