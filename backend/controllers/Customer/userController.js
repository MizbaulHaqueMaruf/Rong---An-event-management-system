const User=require('../../models/User');

const getUser = async (req,res)=>{
        const userId = req.params.id;
        try{
            const user=await User.findById(userId);
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
}
module.exports = { getUser}