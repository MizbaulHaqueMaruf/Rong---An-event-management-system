require("dotenv").config();
const nodemailer = require("nodemailer");
const sellerWallet = require("../../models/sellerWallet");
const sellers = require("../../models/sellerModel");
const events = require("../../models/eventModel");
const User=require('../../models/User');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const uuid = require('uuid');
const path = require('path');

const createPDF = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const sellerWallet_info = await sellerWallet.findOne({ transactionId });
    console.log(sellerWallet_info);
    if (!sellerWallet_info)
      res.status(400).send({ message: "Couldn't find sellerWallet" });

    const user = await User.findById(sellerWallet_info.customerId);
    if (!user)
      res.status(400).send({ message: "Couldn't find Customer" });

    const event = await events.findById(sellerWallet_info.eventId);
    if (!event)
      res.status(400).send({ message: "Couldn't find Event" });

    const seller = await sellers.findById(sellerWallet_info.sellerId);
    console.log(seller);
    if (!seller)
      res.status(400).send({ message: "Couldn't find Seller" });

    const doc = new PDFDocument();
    const filename = `ticket_${uuid.v4()}.pdf`;
    const uploadDirectory = path.join(__dirname, 'uploads');
    console.log(uploadDirectory);
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    const filePath = path.join(uploadDirectory, filename);

    doc.pipe(fs.createWriteStream(filePath));

    const numberOfSeats = String(sellerWallet_info.numberOfTickets);
    const eventDescription = event.description;
    const sellerName = seller.name;
    const sellerEmail = seller.email;

    doc.fontSize(20).text('Event Title', { align: 'center' });
    doc.moveDown().fontSize(16).text(`Ticket for: ${user.firstName} ${user.lastName}`, { bold: true });
    doc.moveDown().text(`Event Date: ${event.eventDate}`, { font: 'Times-Roman', fontSize: 8 });
    doc.moveDown().stroke();
    doc.moveDown().font('Times-Roman').fontSize(8).text(eventDescription);
    doc.moveDown().text(`Sold by: ${sellerName}`, { font: 'Times-Roman', fontSize: 8 });
    doc.moveDown().text(`Number of Seats: ${numberOfSeats}`, { font: 'Times-Roman', fontSize: 8 });
    doc.moveDown().text(`Seller Email: ${sellerEmail}`, { font: 'Times-Roman', fontSize: 8 });
    doc.end();

    res.status(200).send({ fileName: filename, userEmail: user.email });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};


// Send the PDF via email
const sendEmail = async (req, res) => {
  try{
  const {userEmail, fileName} = req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:  process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD,       
    },
  });
  const filePath = path.join(__dirname, 'uploads', fileName);
  // Set up email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail, 
    subject: "Ticket has Arrived !",
    text: 'Please find the ticket in attached PDF document.',
    attachments: [
      {
        filename: 'ticket.pdf',
        path: filePath,
        encoding: 'base64',
      },
    ],
  };
    console.log(mailOptions.attachments);
    console.log(transporter);
    const info = await transporter.sendMail(mailOptions);
    if(!info){
      console.log("Email failed");
    }
    console.log('Email sent: ', info.response);
  }catch(error){
    res.status(500).send({message: error.message});
  }
};
module.exports = { createPDF, sendEmail };