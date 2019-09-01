import session from 'express-session';

export function clearCookie(req, res, next){
  if (req.cookies.user_sid && !req.session.user_sid) 
      res.clearCookie('user_sid');
  next();
}

export const setSession = session({
  key: 'user_sid',
  secret: 'qwerty',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000,
  },
});