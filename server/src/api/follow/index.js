module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper.js');
  const authenticate = require('$utils/authenticate');

  // Create(Follow)
  router.post(
    '/',
    authenticate,
    doAsync(async (req, res) => {
      const { follower, followee } = req.body;

      if (!follower || !followee || followee === follower) {
        const error = new Error(
          'follwer or followee is missed or foller and followee are same.'
        );
        error.statusCode = 400;
        throw error;
      }

      const result = await db.Follow.create({
        follower,
        followee,
      });

      if (!result) {
        const error = new Error('Follow Create Failed.');
        error.statusCode = 500;
        throw error;
      }

      res.status(200).json(result);
    })
  );

  /**
   * 모든 Followee 조회
   */
  // Retreive
  router.get(
    '/',
    doAsync(async (req, res) => {
      const { followee } = req.body;
      if (!follower || !followee || followee === follower) {
        const error = new Error('follower is not given.');
        error.statusCode = 400;
        throw error;
      }

      const results = await db.Follow.findAll({
        where: {
          followee,
        },
      });
      if (!results) {
        const error = new Error('Follow Retrieval Failed.');
        error.statusCode = 500;
        throw error;
      }

      res.status(200).json(results);
    })
  );

  // Delete
  router.delete(
    '/',
    authenticate,
    doAsync(async (req, res) => {
      const { follower, followee } = req.params;
      if (!comment_id) {
        const error = new Error(
          'follwer or followee is missed or foller and followee are same.'
        );
        error.statusCode = 400;
        throw error;
      }

      const result = await db.Follow.destroy({
        where: {
          follower,
          followee,
        },
      });
      if (result === 0) {
        const error = new Error('follwer or followee email is wrong.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(result);
    })
  );

  return router;
};
