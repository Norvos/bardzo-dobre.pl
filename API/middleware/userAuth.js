import {User} from '../models/user';
const  jwt  =  require('jsonwebtoken');

const getToken = (req) => {
  let token = req.headers['authorization']; 
  // Express headers are auto converted to lowercase
  if(token){
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      return token.slice(7, token.length);
    }else return null;
  }else return null;
  
}

export async function userAuthorize(req,res,next) {
 
  if(req.decoded) 
  {
    const user = await User.findOne({_id : req.decoded.id});
    if(user.role === "User") next();
    else res.status(403).json({message: "Forbidden"});

  }else res.status(401).json({message: "Unauthorized"});
}

export function isUserLogin (req, res, next){
  const token = getToken(req);
  if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded)  => {
      if (err) {
        res.status(403).json({message: "Forbidden"});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } 
  else res.status(401).json({message: "Unauthorized"});
}

export async function ownerAuthorize (req,res,next){
 if(req.decoded) 
  {
    const user = await User.findOne({_id : req.decoded.id});
    if(user.role === "Owner") next();
    else res.status(403).json({message: "Forbidden"});

  }else res.status(401).json({message: "Unauthorized"});
}



