
const jwt = require('jsonwebtoken');

const createToken =async(email)=>{
    return jwt.sign({email},process.env.JWT_SECRET)
}

const loginAdmin = async(req,res)=>{
    try{
    const{email,password} = req.body;
    
     if(email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD){
        return res.status(400).json({success:false,message:"Invalid credentials"})
     }
     
     const token = await createToken(email);
     console.log("token",token)
     return res.status(200).json({success:true,token})
    }catch(error){
        res.status(500).json({success:false,error})
    }

}
module.exports = {loginAdmin}