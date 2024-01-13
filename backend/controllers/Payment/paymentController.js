const sellerWallet = require("../../models/sellerWallet");
const rongWallet = require("../../models/rongWallet");
const Order = require("../../models/Order");
const sellers = require("../../models/sellerModel");
const stripe = require("stripe")("sk_test_51OWhCHHyOH1NkwnJnqpUHUTeQ5dAptRdHOYOBNZa7SQgoPPJ8dYc6ODfAXKGe8FG4OWWG5zLkfgDm4UbRlream2d00serB8OL2");
const uuid = require("uuid");
const sellerPay = async(req, res) => {
    try{
    const { eventId,customerId, unitPrice,numberOfTickets} = req.body;
    
    console.log(req.body);

    transactionId = uuid();    
    const newWallet = new sellerWallet({
                sellerId,
                customerId,
                transactionId,
                eventId,
                amount: unitPrice*numberOfTickets,
                numberOfTickets
    });
    await newWallet.save();
    }catch(err) {
            res.json(500).json({error: err});
    }
}

const rongPay = async (req, res) => {
    try{
        const {sellerId, customerId, transactionId, totalAmount, platformCharge, numberOfTickets} = req.body;
        console.log(req.body);
        const newRongWallet = new rongWallet({
                sellerId,
                customerId,
                transactionId,
                totalAmount,
                platformCharge,
                numberOfTickets
        });
        await newRongWallet.save();

    }catch(err) {
        res.json(500).json({error: err});
    }
}
module.exports ={sellerPay, rongPay};