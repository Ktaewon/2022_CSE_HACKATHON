module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper.js');
  const authenticate = require('$utils/authenticate');

  router.get(
    '/:melody_id',
    authenticate,
    doAsync(async (req, res) => {
      const result = await db.Melody_like.create({
        melody_id: req.params.melody_id,
        user_email: req.session.email,
      });

      res.status(200).json(result);
    })
  );
  router.delete(
    '/:melody_id',
    authenticate,
    doAsync(async (req, res) => {
      const result = await db.Melody_like.destroy({
        where: { melody_id: req.params.melody_id },
      });

      res.status(200).json(result);
    })
  );

  return router;
};
