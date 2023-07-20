const express = require('express');
const passport = require('passport');
const router = express.Router();

// 로그인 라우트
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// 콜백 라우트
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile'); // 사용자가 로그인한 후 리다이렉션할 위치
});

module.exports = router;
