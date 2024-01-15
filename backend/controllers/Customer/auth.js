const User=require('../../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//REGISTER
const CustomerRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const user = await User.findOne({ email: email });
        if (user) {
            console.log(user);
            return res.status(400).send({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        console.log(newUser);
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};



//LOGIN
const CustomerLogin = async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)

    }
    catch(err){
        res.status(500).json(err)
    }
}



//LOGOUT
const CustomerLogOut = async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

//REFETCH USER
const CustomerRefetch = (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}

module.exports = {CustomerLogOut, CustomerLogin, CustomerRefetch, CustomerRegister}