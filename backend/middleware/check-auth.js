const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
   try{
    const decodedToken= jwt.verify(req.query.token,'secret');
    req.userData=decodedToken;
   }
   catch(error){
    return res.status(200).json({'message':'Token Missing or Expired'});
   }
    
   next();
};
