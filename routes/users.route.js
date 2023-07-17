const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const isAuth = require('../middlewares/auth-middleware');
//회원가입
router.post('/signup', UserController.register);
//로그인
router.post('/login', UserController.login);
//로그아웃
router.post('/logout', UserController.logout);

module.exports = router;
