const {Users} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({message:'All fields are required!'})
    }
    try{
        let user = await Users.findOne({email});
        const role = user?.role;
        // if(role===3){
        //     user = await Parents.findOne({email});
        // }else if(role===2){
        //     user = await Employees.findOne({email});
        // }else{
        //     user = await Users.findOne({email});
        // }

    console.log("user",user);
    if(!user) return res.status(402).json({message:'user with this email is not registered!'});
    // if(+user.role !== +role)return res.status(402).json({message:'this user role does not match!'})
    const match = bcrypt.compareSync(password,user.password)
    
    if(!match){
        return res.status(400).json({message:'password does not match'})
    }
    //send jwt
    let token = jwt.sign({email,name:user.name,role,userId:user._id},process.env.TOKEN,{expiresIn:30*60});
    // let token = jwt.sign({email,username:user.name,role:user.role},process.env.TOKEN,{expiresIn:30*60});
    // if(+role===3){
    //     token = jwt.sign({email,username:user.name,role:user.role},process.env.TOKEN,{expiresIn:30*60});
    // }else{
    //     token = jwt.sign({email,username:user.username,role:user.role},process.env.TOKEN,{expiresIn:30*60});
    // }

    return res.status(200).json({message:'user logged in successfully!',data:{token}})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'internal server error',error:err})
    }
}

module.exports = {loginController};

