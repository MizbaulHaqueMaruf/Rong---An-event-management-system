const express=require('express')
const router=express.Router()
const {getUser, getOrderById} = require('../../controllers/Customer/userController')
//GET USER
router.get("/Customer/:id", getUser);
//get Orders of User
router.get("/Customer/getOrders/:id", getOrderById);

module.exports=router