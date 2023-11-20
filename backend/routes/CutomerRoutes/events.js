const express=require('express')
const router=express.Router()
const {getEvents, searchEvents , getEventbyID} = require('../../controllers/Customer/eventController')
//GET Events
router.get("/Customer/events", getEvents);  
//Search Events
router.get("/Customer/searchEvents/:key", searchEvents);
//GET individual Events
router.get("/Customer/events/:id", getEventbyID);
module.exports=router