const { Users } = require('../models');

module.exports = {
  registerUser: async (nickname, password) => {
    const existingUser = await Users.findOne({ where: { nickname } });
    if (existingUser) {
      throw { message: '중복된 닉네임입니다.' };
    }
    return Users.create({
      nickname,
      password,
    });
  },

  findUserByNickname: async nickname => {
    const user = await Users.findOne({ where: { nickname } });
    if (!user) {
      throw { message: '존재하지 않는 닉네임입니다.' };
    }
    return user;
  },

  logoutUser: async (req, res) => {
    // 토큰을 무효화하는 방식으로 로그아웃 구현
    res.cookie('Authorization', { expires: Date.now() });
  },
};
