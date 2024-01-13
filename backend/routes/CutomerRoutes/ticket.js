const express = require('express');
const router = express.Router();
const {sendEmail, createPDF} = require('../../controllers/Ticket/ticketController');

// a ticket
router.get('/ticket/createPDF/:id', createPDF);
//send email
router.post('/ticket/sendEmail', sendEmail);
module.exports = router;