const User=require('../../models/User');
const Order = require('../../models/Order');
const events = require('../../models/eventModel');
const mongoose = require('mongoose');
const getUser = async (req,res)=>{
        const userId = req.params.id;
        try{
            const user=await User.findById(userId);
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
}


const getOrderById = async (req, res) => {
  const { userId}  = req.params.id;
  try {
    const orders = await Order.aggregate([
      {
        $match: { UserId: mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: events, 
          localField: 'eventId',
          foreignField: '_id',
          as: 'eventDetails'
        }
      },
      {
        $project: {
          _id: 1,
          eventTitle: 1,
          totalAmount: 1,
          eventDetails: {
            name: 1,
            images: 1,
            eventDate:1
          }
        }
      }
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the specified user.' });
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { getUser, getOrderById };