const Review =  require("../../models/reviewModel");
const User = require("../../models/User");
const events = require("../../models/eventModel");
const getReviewsByEventId = async (req, res)=>{
    const eventId = req.params.id;
    try {
        const all_reviews = await Review.find({eventId:eventId});
        res.json(all_reviews);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const createReview = async(req, res) => {
    try{
        const { userId, comment, stars, eventId}=req.body;
        const user = await User.findById(userId);
        console.log(req.body);
        if(!user){
            res.status(400).json({ message: "User not found"});
        }
        const userName = user.firstName + " " + user.lastName;
        const event = await events.findById(eventId);
        if(!event){
            res.status(400).json({message: "Event Not Found"});
        }   
        const newReview = new Review({
            userId,
            comment, 
            userName,
            eventId,
            stars,
        })
        await newReview.save();
        await events.updateOne(
            { _id: eventId }, 
            { $set: { rating: (event.rating + stars)/2 } } 
          );
        res.status(200).json({message: "Review saved successfully"});
    }catch (error) {
    }
}
module.exports = {getReviewsByEventId, createReview};

