module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$base/utils/asyncWrapper');
  //const checkClientType = require('$base/utils/checkClientType');
  //const signout = require('./function/signout');
  const { melody } = require('./melodyAPI');

  //melody 작성
  //audio 파일은 어떻게 받는지?
  router.post(
    '/',
    doAsync(async (req, res) => {
      const {
        body: {
          title,
          instrument,
          image,
          deadline,
          hashtag,
          my_instrument,
          need_instrument,
          jenre,
        },
      } = req;
      const user_email = req.session.email;
      const result = await db.Melody.create(
        title,
        instrument,
        image,
        deadline,
        hashtag,
        my_instrument,
        need_instrument,
        jenre,
        user_email
      );
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

  return router;
};
