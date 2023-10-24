/*import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import Token from "../models/token";

//Registration part
export const register = async(req,res)=>{
    try{
    const{name,email,password,number, role}=req.body
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);

    const newAdmin = new Admin(
        {name, email, password, number, role});   
    const saveAdmin = await newAdmin.save()
    const token = new Token({
        userId: saveAdmin._id,
        token: crypto.randomBytes(32).toString("hex")
    });
    await token.save();
    res.status(201).json({ message: 'Admin registration successful'});

    }
    catch{
        res.status(500).json({ error: 'An error occurred while registering.' });
    }
}

//Admin Login

export const login = async(req,res)=>{
    try{
        const{email,password}=req.body;
        const admin  = await Admin.findOne({email:email});
        if(!admin) return res.status(400).json({msg:"This Admin does not exist"});

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Password"});
        const token = jwt.sign({id:admin._id}, process.env.JWT_SECRET);
        delete admin.password;
        res.status(200).json({token,admin});
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}*/