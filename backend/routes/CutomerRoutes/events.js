const express=require('express')
const router=express.Router()
const {getEvents, searchEvents , getEventbyID, createOrder} = require('../../controllers/Customer/eventController')
//GET Events
router.get("/Customer/events", getEvents);  
//Search Events
router.get("/Customer/searchEvents/:key", searchEvents);
//GET individual Events
router.get("/Customer/events/:id", getEventbyID);
///GET order events 
router.post("/Customer/orderEvent", createOrder);
module.exports=router