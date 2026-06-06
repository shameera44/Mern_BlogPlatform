
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//register function
export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({ error: "some fields are empty" });
    }

    //check already exist  with username
    const userwithusername = await userModel.findOne({ username });
    if (userwithusername) {
        return res.json({ message: "username already exist" });
    }


    //check already exist  with email
    const userwithemail = await userModel.findOne({ email });
    if (userwithemail) {
        return res.json({ message: "email already exist" });
    }

    //password hash 
const hashedPassword = await bcrypt.hash(password,10);
const newUser = await userModel.create({
    username,
    email,
    password:hashedPassword,
});
return res.json({message:"user register successfully"});
};


//login function
export const loginUser = async (req, res) => {
    const {email,password} =req.body;

    if(!email ||!password){
        res.json({error:"all fields are required"});
}

const user = await userModel.findOne({email})

if(!user){
    return res.json({error:"you are not registered"});
    }

    const verified = await bcrypt.compare(password,user.password);
    
    if(!verified){
        return res.json({error:"invalid credentials"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    return res.json({message:"Login successful",
        token});

};