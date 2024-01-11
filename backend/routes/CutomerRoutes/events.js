const express=require('express')
const router=express.Router()
const {getEvents, searchEvents , getEventbyID, createOrder, getSellerbyEventId, initiatePayment, deleteOrder} = require('../../controllers/Customer/eventController')


//GET Events
router.get("/Customer/events", getEvents);  
//Search Events
router.get("/Customer/searchEvents/:key", searchEvents);
//GET individual Events
router.get("/Customer/events/:id", getEventbyID);
///GET order events 
router.post("/Customer/events/orderEvent", createOrder);
///Get seller
router.get("/Customer/events/seller/:id", getSellerbyEventId);
///delete order
router.delete("/Customer/events/deleteOrder", deleteOrder);
///POST payment
router.post("/Customer/events/create-checkout-session",initiatePayment);
module.exports=router