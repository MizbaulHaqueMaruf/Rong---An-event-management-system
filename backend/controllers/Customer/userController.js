const User=require('../../models/User');
const Order = require('../../models/Order');
const events = require('../../models/eventModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    // If a new password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getOrderById = async (req, res) => {
  const userId = req.params.id;
  console.log(req.params);
  console.log(userId);

  try {
    const userIdObject = new mongoose.Types.ObjectId(userId);

    const orders = await Order.aggregate([
      {
        $match: { UserId: userIdObject , isPaid: false}
      },
      {
        $lookup: {
          from: "events", 
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
          isPaid:1,
          sellerId:1,
          numberOfSeats:1,
          eventDetails: {
            _id:1, 
            name: 1,
            images: 1,
            eventDate: 1
          }
        }
      }
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the specified user.' });
    }
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getUser, getOrderById, updateUser, deleteUser};