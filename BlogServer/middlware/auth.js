const jwt = require("jsonwebtoken");

const auth = async(req,res,next)=>{
    const token = req.headers.authorization;
    try{
        jwt.verify(token,process.env.JWT_SECRET) ;
        next();
    }catch(error){
        res.json({success:false,message:"Invalid token"})
    }
}

module.exports = auth;