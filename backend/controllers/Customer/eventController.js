const events = require("../../models/eventModel");
const sellers = require("../../models/sellerModel");


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
module.exports = {getEvents, searchEvents, getEventbyID};