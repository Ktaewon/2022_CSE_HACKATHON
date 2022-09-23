module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$base/utils/asyncWrapper');
  const { like } = require('./likeAPI');

  //메인멜로디 좋아요
  router.post(
    '/mainmelody_like/:melody_id',
    doAsync(async (req, res) => {
      const { melody_id } = req.params;
      const {
        body: { body },
      } = req;
      const user_email = req.session.email;

      const result = await db.Submelody.create(melody_id, body, user_email);

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
  // router.get('/api/submelody/', async (req, res) => {
  //   // const { submelody_id } = db.Submelody.id;
  // 	const sub_array=req.body;
  // 		const submelody = await db.Submelody.findAll({
  // 			where: { id:  },
  // 		});
  // 		sub_id_array.push(submelody);
  // 	}
  //   // const submelody = await db.Submelody.findOne({
  //   //   where: { id: submelody_id },
  //   // });
  //   if (!sub_id_array) {
  //     res.status(500).send({ message: '에러남' });
  //   }

  //배열을 json으로 받아서 그대로 where에 넣기만 하면됨
  router.get('/api/submelody/', async (req, res) => {
    //findall이 배열에 담아서 주는거
    const submelody = await db.Submelody.findAll({
      where: { id: req.body.id_list },
    });
    if (!submelody) {
      res.status(500).send({ message: '에러남' });
    }
    res.status(200).json(submelody);
  });

  //   res.status(200).json(sub_id_array);
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
