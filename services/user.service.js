'use strict';

const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');

module.exports = {
  registerUser: async (nickname, password, confirm) => {
    try {
      // 유효성 검사
      if (!nickname || !password || !confirm) {
        throw {
          message: '미입력된 항목이 있습니다. 모두 입력해주세요.',
        };
      }

      const nicknamePattern = /^[A-Za-z0-9]{3,}$/;
      if (!nicknamePattern.test(nickname)) {
        throw {
          message:
            '닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성해 주세요.',
        };
      }

      if (password.length < 4) {
        throw {
          message: '비밀번호는 최소 4자 이상입니다.',
        };
      }

      if (password !== confirm) {
        throw {
          message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        };
      }

      // 유효성 검사 통과 후 사용자 등록
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserRepository.registerUser(
        nickname,
        hashedPassword,
      );

      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //로그인
  loginUser: async (nickname, password, res) => {
    try {
      const user = await UserRepository.findUserByNickname(nickname);
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw {
          message: '비밀번호가 틀렸습니다.',
        };
      }

      UserRepository.generateToken(user, res);
      console.log('쿠키 생성 완료');

      return { message: '로그인 성공' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logoutUser: async (req, res) => {
    try {
      await UserRepository.logoutUser(req, res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
