module.exports = (password, salt) => {
  const crypto = require('crypto');

  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      }
      try {
        crypto.pbkdf2(
          password,
          salt || buf.toString('base64'),
          100000,
          64,
          'sha512',
          (err, key) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                password: key.toString('base64'),
                salt: buf.toString('base64'),
              });
            }
          }
        );
      } catch (err) {
        resolve(err);
      }
    });
  });
};
