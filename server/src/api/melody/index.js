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
    '/melody',
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
          audio,
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
        audio,
        jenre,
        user_email
      );
      if (!result) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(result);
    })
  );

  //submelody 작성
  router.post(
    '/submelody/:melody_id',
    doAsync(async (req, res) => {
      const { melody_id } = req.params;
      const {
        body: { title, instrument, audio, body },
      } = req;
      const user_email = req.session.email;

      const result = await db.Submelody.create(
        title,
        instrument,
        audio,
        melody_id,
        body,
        user_email
      );

      if (!result) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(result);
    })
  );

  router.get('/api/melody/:melody_id', async (req, res) => {
    const { melody_id } = req.params;
    const melody = await db.Melody.findOne({ where: { id: melody_id } });
    if (!melody) {
      res.status(500).send({ message: '에러남' });
    }
    res.status(200).json(melody);
  });

  //서브멜로디 배열로 불러와서 찾아야 할 듯
  router.get('/api/submelody/:submelody_id', async (req, res) => {
    const { submelody_id } = req.params;
    const submelody = await db.Submelody.findOne({
      where: { id: submelody_id },
    });
    if (!submelody) {
      res.status(500).send({ message: '에러남' });
    }
    res.status(200).json(submelody);
  });

  //
  // router.get(
  // 	'/api/submelody/',
  // 	async(req,res)=>{
  // 	// var data=req.app.get('data');
  // 	const array=JSON.parse(req.body.D);
  // 	for(let i=0;i<array.length;i++){
  // 			array.push(D.body[i]);
  // 	}
  // 	data.push(req.body);

  // }
  // )

  return router;
};
