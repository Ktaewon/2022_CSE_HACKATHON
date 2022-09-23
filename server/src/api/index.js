module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  router.use('/auth', require('./auth')(db));
  router.use('/comment', require('./comment')(db));
  router.use('/mainmelody_like', require('./mainmelody_like')(db));
  router.use('/submelody_like', require('./submelody_like')(db));

  return router;
};
