var router = require('express').Router();
var authCont = require('../controllers/authController');
const passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '205537004608-9rgbs150eekbrbp0nm1q1k9h72jc3qcr.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    return done(null, userProfile);
}
));

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
   
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Successful authentication, redirect success.
  res.redirect('/success');
});

router
.post('/signIn',authCont.signIn)
.post('/signUp',authCont.signUp)
.get('/cal/callback',authCont.callbackOAuth)
module.exports = router;