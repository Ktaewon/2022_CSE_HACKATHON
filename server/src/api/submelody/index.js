module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$base/utils/asyncWrapper');
  //const checkClientType = require('$base/utils/checkClientType');
  //const signout = require('./function/signout');
  const { submelody } = require('./submelodyAPI');

  //submelody 작성
  router.post(
    '/',
    doAsync(async (req, res) => {
      const {
        body: { title, instrument, body, melody_id },
      } = req;
      const user_email = req.session.email;

      const result = await db.Submelody.create(
        title,
        instrument,
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

  //submelody 불러오기
  router.get(
    '/',
    doAsync(async (req, res) => {
      const { melody_id } = req.query;
      const submelody = await db.Submelody.findAll({
        where: { id: melody_id },
      });

      if (!submelody) {
        res.status(500).send({ message: '에러남' });
      }
      res.status(200).json(submelody);
    })
  );

  //서브멜로디 배열로 불러와서 찾아야 할 듯
  // router.get('/:melody_id', async (req, res) => {
  // 	const { submelody_id } = req.params;
  // 	const melody = await db.Melody.findOne({ where: { id: melody_id } });
  // 	const submelody = await db.Submelody.findAll({
  //     where: { id:  },
  //   });
  //   if (!submelody) {
  //     res.status(500).send({ message: '에러남' });
  //   }
  //   res.status(200).json(submelody);
  // });

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
