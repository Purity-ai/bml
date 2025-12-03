import validator from 'validator'
import bcrypt from 'bcrypt' //hashing the userpassword
import userModel from '../models/userModel.js'  
import jwt from 'jsonwebtoken'

// API TO REGISTER
const registeruser = async (req,res) => {
    try {
        const {Fullname, Regnumber, username, password} = req.body
        if (!Fullname || !username || !password || !Regnumber){
            return res.json({success:false,message:"MissingDetails"})
        }
        
        // Note: validator doesn't have isRegnumber or isusername methods
        // You might want to comment these out or use custom validation
        // if (!validator.isRegnumber(Regnumber)){
        //     return res.json({success:false,message:"Enter the correct Regnumber"})
        // }
        // if (!validator.isusername(username)){
        //     return res.json({success:false,message:"Enter your username"})
        // }
        
        if (password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }
        
        //HASHING USERPASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const userData = {
            Fullname, 
            Regnumber, 
            username, 
            password:hashedpassword
        }
        
        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api for user login
const loginUser = async (req, res) => {
    try {
        const {Fullname, Regnumber, username, password} = req.body
        const user = await userModel.findOne({Fullname, Regnumber, username})

        if(!user){
            return res.json({success:false,message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registeruser, loginUser}