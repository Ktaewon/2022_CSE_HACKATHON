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

      if (!melody_id) {
        const error = new Error('Melody ID is not given.');
        error.statusCode = 400;
        throw error;
      }

      const result = await db.Comment.create({
        melody_id,
        body,
        user_email: req.session.email,
      });

      if (!result) {
        const error = new Error('Comment Create Failed.');
        error.statusCode = 500;
        throw error;
      }

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
      if (!melody_id) {
        const error = new Error('Melody ID is not given.');
        error.statusCode = 400;
        throw error;
      }

      const results = await db.Comment.findAll({
        where: {
          melody_id,
        },
      });
      if (!results) {
        const error = new Error('Comment Retrieval Failed.');
        error.statusCode = 500;
        throw error;
      }

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
          comment_id,
        },
      });
      if (!result) {
        const error = new Error('Comment id is wrong.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(result);
    })
  );

  // Delete
  router.delete(
    '/:comment_id',
    authenticate,
    doAsync(async (req, res) => {
      const { comment_id } = req.params;
      if (!comment_id) {
        const error = new Error('Comment ID is not given.');
        error.statusCode = 400;
        throw error;
      }

      const result = await db.Comment.destroy({
        where: {
          id: comment_id,
        },
      });

      if (result === 0) {
        const error = new Error('Comment id is wrong.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(result);
    })
  );

  return router;
};
