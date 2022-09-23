module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper.js');
  const authenticate = require('$utils/authenticate');
  //const { signin, signup, signout } = require('./authAPI');

  router.get(
    '/:sub_melody_id',
    authenticate,
    doAsync(async (req, res) => {
      const result = await db.SubMelody_like.create({
        sub_melody_id: req.params.sub_melody_id,
        user_email: req.session.email,
      });

      res.status(200).json(result);
    })
  );
  router.delete(
    '/:sub_melody_id',
    authenticate,
    doAsync(async (req, res) => {
      const result = await db.SubMelody_like.destroy({
        where: { sub_melody_id: req.params.sub_melody_id },
      });

      res.status(200).json(result);
    })
  );

  return router;
};
