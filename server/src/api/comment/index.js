module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper.js');
  const authenticate = require('$utils/authenticate');

  // Create
  router.post(
    '/',
    authenticate,
    doAsync(async (req, res) => {
      const { melody_id, body } = req.body;

      const result = await db.Comment.create({
        melody_id,
        body,
        user_email: req.session.email,
      });

      res.status(200).json(result);
    })
  );

  /**
   * 모든 Comment 조회
   */
  // Retreive
  router.get(
    '/',
    authenticate,
    doAsync(async (req, res) => {
      const { melody_id, body } = req.body;

      const results = await db.Comment.findAll({
        where: {
          melody_id,
        },
      });

      res.status(200).json(results);
    })
  );
  /**
   * Comment 하나 조회
   */
  router.get(
    '/:comment_id',
    authenticate,
    doAsync(async (req, res) => {
      const { comment_id } = req.params;

      const result = await db.Comment.findOne({
        where: {
          melody_id,
        },
      });

      res.status(200).json(result);
    })
  );

  // Delete
  router.delete(
    '/:comment_id',
    authenticate,
    doAsync(async (req, res) => {
      const { comment_id } = req.params;

      const result = await db.Comment.destroy({
        where: {
          id: comment_id,
        },
      });

      res.status(200).json(result);
    })
  );

  return router;
};
