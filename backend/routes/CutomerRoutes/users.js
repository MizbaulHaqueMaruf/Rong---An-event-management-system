const express=require('express')
const router=express.Router()
const {getUser, getOrderById, updateUser, deleteUser} = require('../../controllers/Customer/userController')
//GET USER
router.get("/Customer/:id", getUser);
//get Orders of User
router.get("/Customer/getOrders/:id", getOrderById);
//Update User
router.put("/Customer/:id", updateUser);
//Delete User
router.delete("/Customer/:id", deleteUser);
module.exports=router