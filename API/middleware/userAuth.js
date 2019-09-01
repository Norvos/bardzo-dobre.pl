import {User} from '../models/user';

export async function userAuthorize(req,res,next) {
  if(req.session.user_sid)
  {
    const user = await User.findOne({_id : req.session.user_sid});
    if(user.role === "User") next();
    else  res.status(403).json({message: "Forbidden"});
  }
  else res.status(403).json({message: "Forbidden"});
}

export function userLogin (req, res, next){
  if(req.session.user_sid) next();
  else res.status(401).json({message: "Unauthorized"});
}

export async function ownerAuthorize (req,res,next){
  if(req.session.user_sid)
  {
    const user = await User.findOne({_id : req.session.user_sid});
    if(user.role === "Owner") next();
    else res.status(403).json({message: "Forbidden"});
  }
  else res.status(403).json({message: "Forbidden"});
}