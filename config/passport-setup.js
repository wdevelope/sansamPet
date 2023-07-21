const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

passport.serializeUser((user, done) => {
  console.log(user.user.userId); // 로그인 된 사용자 userid
  done(null, user.user.userId);
});

passport.deserializeUser((id, done) => {
  Users.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await Users.findOne({
          where: { googleId: profile.id },
        });
        if (existingUser) {
          const token = jwt.sign(
            { userId: existingUser.userId },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: process.env.JWT_EXPIRE_TIME,
            },
          );
          console.log(token);
          return done(null, { user: existingUser, token });
        }

        const newUser = await Users.create({
          googleId: profile.id,
          nickname: profile.displayName,
          password: require('crypto').randomBytes(64).toString('hex'),
        });
        const token = jwt.sign(
          { userId: newUser.userId },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRE_TIME,
          },
        );

        return done(null, { user: newUser, token });
      } catch (error) {
        return done(new Error('Google 로그인 실패'), null);
      }
    },
  ),
);
