const throwUnauthenticatedError = (next) => {
  const error = new Error('Unauthenticated Error');
  error.statusCode = 401;
  next(error);
};

module.exports = (req, res, next) => {
  // 인증 성공
  if (req.session) {
    next();
  } else {
    throwUnauthenticatedError(next);
  }
};
