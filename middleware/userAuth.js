const User = require('../models/user');

exports.authorize = async function(req,res,next) {
  if(req.session.user_sid)
  {
    const user = await User.findOne({_id : req.session.user_sid});
    if(user.role === "User") next();
    else  res.status(403).json({message: "Forbidden"});
  }
  else  res.status(403).json({message: "Forbidden"});

};