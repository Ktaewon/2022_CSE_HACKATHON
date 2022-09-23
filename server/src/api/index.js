module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  router.use('/auth', require('./auth')(db));

  return router;
};
