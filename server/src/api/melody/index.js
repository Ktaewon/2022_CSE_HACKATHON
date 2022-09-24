module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper');
  const authenticate = require('$utils/authenticate');

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

  return router;
};
