exports.catchAsyncErrors = (fn) => {
  
  return (req,res,next) => {
    fn(req,res,next).catch(err => next(err));
  };

};

exports.catchErrors =  (err, req, res, next) => {

  res.status(err.status || 500);
  
  if (process.env.NODE_ENV === 'development'){
    res.json({
      message: err.message,
      error: err });
  }else {
    res.json({
      message: err.message,
      error: {} });
    }
};

