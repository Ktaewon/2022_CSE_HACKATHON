module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper');
  const authenticate = require('$utils/authenticate');
  const { streamAudio } = require('./submelodyAPI');

  const multer = require('multer');
  //submelody 작성
  router.post(
    '/',
    authenticate,
    doAsync(async (req, res) => {
      const { title, instrument, body, melody_id } = req.body;

      const user_email = req.session.email;

      const result = await db.Submelody.create({
        title,
        instrument,
        melody_id,
        body,
        user_email,
      });

      if (!result) {
        const error = new Error('Sub Melody Creation Failed');
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json(result);
    })
  );

  //submelody 전체 불러오기
  router.get(
    '/',
    doAsync(async (req, res) => {
      const { melody_id } = req.query;
      const submelodies = await db.Submelody.findAll({
        where: { id: melody_id },
      });

      if (!submelodies) {
        const error = new Error('Sub Melody Retrieval Failed');
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json(submelodies);
    })
  );

  //submelody 오디오 올리기
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now().valueOf()}_${file.originalname}`);
    },
  });

  const upload = multer({ storage }).array('uploadFiles');

  router.post(
    '/audio/:submelody_id', //몇번 포스트에 올릴건지
    authenticate,
    upload,
    doAsync(async (req, res) => {
      const { submelody_id } = req.params;

      const melody = await db.Submelody.findOne({
        where: { id: submelody_id },
      });
      if (!melody) {
        const error = new Error('submelody id is wrong');
        error.statusCode = 400;
        throw error;
      }

      const audio = req.files[0].filename;
      console.log(req.files);

      const result = await db.Submelody.update(
        { audio },
        { where: { id: submelody_id } }
      );
      console.log('오디오 이름은 : ' + audio);

      if (!result) {
        const error = new Error('Sub Melody Audio Upload Failed.');
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json(result);
    })
  );

  router.get(
    '/audio/:filepath',
    doAsync(async (req, res) => {
      const { filepath } = req.params;

      console.log('requested streaming audio : ' + filepath);

      const playfile = await db.Submelody.findOne({
        where: { audio: filepath },
      });

      if (!playfile) {
        const error = new Error('Sub Melody Audio is Not Exists.');
        error.statusCode = 400;
        throw error;
      }
      streamAudio(req, res, filepath);
    })
  );

  //--------------------------------------------------------------------------------------//
  //서브멜로디 배열로 불러와서 찾아야 할 듯
  router.get('/:melody_id', async (req, res) => {
    // 	const { submelody_id } = req.params;
    // 	const melody = await db.Melody.findOne({ where: { id: melody_id } });
    // 	const submelody = await db.Submelody.findAll({
    //     where: { id:  },
    //   });
    //   if (!submelody) {
    //     res.status(500).send({ message: '에러남' });
    //   }
    //   res.status(200).json(submelody);
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
