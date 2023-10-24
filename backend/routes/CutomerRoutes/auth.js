const express=require('express')
const router=express.Router()
const {CustomerLogin , CustomerRegister , CustomerLogOut, CustomerRefetch} = require('../../controllers/Customer/auth')

//REGISTER
router.post("/Customer/register",CustomerRegister)
//LOGIN
router.post("/Customer/login",CustomerLogin)
//LOGOUT
router.get("/Customer/logout", CustomerLogOut)
//REFETCH USER
router.get("/Customer/refetch", CustomerRefetch)



module.exports=router