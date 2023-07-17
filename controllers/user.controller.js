const UserService = require('../services/user.service.js');

module.exports = {
  //회원가입
  register: async (req, res) => {
    const { nickname, password, confirm } = req.body;
    try {
      const newUser = await UserService.registerUser(
        nickname,
        password,
        confirm,
      );
      res.status(201).json(newUser);
    } catch (error) {
      res.status(error.status || 400).json({ message: error.message });
    }
  },

  //로그인
  login: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const token = await UserService.loginUser(nickname, password, res);
      res.status(200).json(token);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //로그아웃
  logout: async (req, res) => {
    try {
      await UserService.logoutUser(req, res);
      return res.status(200).json({ message: '로그아웃 되었습니다.' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
