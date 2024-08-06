const jwt=require('jsonwebtoken');
const authGuard=(req,res,next)=>{
//get header authorization
const authHeader= req.headers.authorization;
if(!authHeader){
    return res.json({
        success:false,
        message:"Authorization header not found!"
    })
}
const token=authHeader.split(' ')[1];
if(!token){
    return res.json({
        success:false,
        message:"Token not found!"
    })
}
try{
    const decodeUser=jwt.verify(token,process.env.JWT_SECRET);
  
    req.user = {
        userId: decodeUser.userId,
        email: decodeUser.email,
      
        firstName: decodeUser.firstName, 
        
      };
    next();

}catch(error){
    res.json({
        success:false,
        message:"Invalid Token"
    })
}

}
module.exports=authGuard;