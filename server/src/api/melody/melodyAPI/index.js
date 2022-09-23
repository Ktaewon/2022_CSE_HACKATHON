const melody = async (
  title,
  instrument,
  image,
  deadline,
  hashtag,
  my_instrument,
  need_instrument,
  audio,
  jenre,
  db,
  session
) => {
  const getEncryptedPasswordInfo = require('$base/utils/getEncryptedPasswordInfo');

  let user = await db.User.findOne({
    where: {
      email,
      is_valid: 1,
    },
  });

  if (!user) {
    const error = new Error('No Corresponding User');
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  melody,
};
