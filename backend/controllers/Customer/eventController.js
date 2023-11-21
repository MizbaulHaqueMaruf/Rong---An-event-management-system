const events = require("../../models/eventModel");
const sellers = require("../../models/sellerModel");
const Order = require("../../models/Order");

const getEvents = async (req, res) => {
  try {
    const all_events = await events.find();
    res.json(all_events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const searchEvents = async (req, res) => {
    const searchKey = req.params.key;
    try {
      // Searching events based on various fields using regular expressions
      const searched_events = await events.find({
        $or: [
          { name: { $regex: searchKey, $options: 'i' } }, 
          { category: { $regex: searchKey, $options: 'i' } },
          { description: { $regex: searchKey, $options: 'i' } },
          { orgName: { $regex: searchKey, $options: 'i' } },
        ],
      });
      res.json(searched_events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const getEventbyID = async (req, res)=>{
  const eventId = req.params.id;

  try {
    const event = await events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) =>{
  try {
    const { eventId, eventTitle, eventOrganizer, UserId} = req.body;
    const ticketId = generateRandomId(); // Function to generate a random ticket ID
    const eventDate = new Date().toISOString().split('T')[0]; // Get current date

    // Create the order in the database
    const newOrder = new Order({
      eventId,
      eventTitle,
      eventOrganizer,
      ticketId,
      eventDate,
      UserId,
    });

    await newOrder.save(); // Save the new order

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9); // Random alphanumeric ID
}

module.exports = {getEvents, searchEvents, getEventbyID, createOrder};