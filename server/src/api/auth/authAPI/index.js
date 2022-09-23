const signin = async (email, password, db, session) => {
  const getEncryptedPasswordInfo = require('$utils/getEncryptedPasswordInfo');

  // // 멤버 확인
  // let role = 'user';

  let member = await db.User.findOne({
    where: {
      email,
      is_valid: 1,
    },
  });

  if (!member) {
    const error = new Error('No Corresponding Member');
    error.statusCode = 401;
    throw error;
  }

  // 비밀번호 확인
  const { password: encrypted_password } = await getEncryptedPasswordInfo(
    password,
    member.salt
  );
  if (encrypted_password !== member.password) {
    const error = new Error('Password Not Matched');
    error.statusCode = 401;
    throw error;
  }

  // 세션에 데이터 저장
  session.email = email;
  session.nickname = member.nickname;

  return {
    message: 'success',
  };
};

const signup = async (user_info, db, session) => {
  const getEncryptedPasswordInfo = require('$utils/getEncryptedPasswordInfo');
  console.log(user_info);
  const { email, password, nickname } = user_info;

  try {
    password_info = await getEncryptedPasswordInfo(password);
    await db.User.create({
      email,
      nickname,
      ...password_info,
    });

    // 세션에 데이터 저장
    session.email = email;
    session.nickname = nickname;
  } catch (err) {
    throw err;
  }
};

const signout = (session) => {
  session.destroy((err) => {
    throw err;
  });
};

module.exports = {
  signin,
  signup,
  signout,
};
