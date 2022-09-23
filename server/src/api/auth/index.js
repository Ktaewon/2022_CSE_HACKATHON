module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  const { doAsync } = require('$utils/asyncWrapper.js');
  //const checkClientType = require('$base/utils/checkClientType');
  //const signout = require('./function/signout');
  const { signin, signup, signout } = require('./authAPI');

  router.post(
    '/signin',
    doAsync(async (req, res) => {
      const {
        body: { email, password },
      } = req;

      const result = await signin(email, password, db, req.session);

      res.status(200).json(result);
    })
  );

  // router.use('/signup', require('./signup')(db));
  //회원가입
  router.post(
    '/signup',
    doAsync(async (req, res) => {
      const user_info = req.body;

      await signup(user_info, db, req.session);

      res.status(200).json({
        message: 'success',
      });
    })
  );

  router.get('/signout', (req, res, next) => {
    try {
      signout(req.session);

      res.json({
        message: 'success',
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
