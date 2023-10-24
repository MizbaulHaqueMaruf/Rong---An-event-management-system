const express=require('express')
const router=express.Router()
const {getUser} = require('../../controllers/Customer/userController')
//GET USER
router.get("/Customer/:id", getUser);


module.exports=router