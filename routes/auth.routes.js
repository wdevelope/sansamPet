const express = require('express');
const passport = require('passport');
const router = express.Router();

// 로그인 라우트
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// Google 로그인 후 redirect 처리
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // user 객체를 쿠키로 설정
  res.cookie('user', JSON.stringify(req.user));
  // JWT 토큰을 응답 헤더에 추가
  res.setHeader('Authorization', 'Bearer ' + req.user.token);
  // 메인 페이지로 리다이렉트

  res.redirect('http://localhost:3000');
});

module.exports = router;
