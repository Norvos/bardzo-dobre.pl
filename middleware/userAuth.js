const User = require('../models/user');

exports.userAuthorize = async function(req,res,next) {
  if(req.session.user_sid)
  {
    const user = await User.findOne({_id : req.session.user_sid});
    if(user.role === "User") next();
    else  res.status(403).json({message: "Forbidden"});
  }
  else res.status(403).json({message: "Forbidden"});

};

exports.ownerAuthorize = async function(req,res,next) {
  if(req.session.user_sid)
  {
    const user = await User.findOne({_id : req.session.user_sid});
    if(user.role === "Owner") next();
    else  res.status(403).json({message: "Forbidden"});
  }
  else res.status(403).json({message: "Forbidden"});

};