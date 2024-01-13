const Review =  require("../../models/reviewModel");
const User = require("../../models/User");
const getReviewsByEventId = async (req, res)=>{
    const eventId = req.params.eventId;
    try {
        const all_reviews = await Review.find({eventId}).sort({createdAt: -1});
        res.json(all_reviews);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const createReview = async(req, res) => {
    try{
        const { userId, comment, stars, eventId}=req.body;
        const user = await User.findById(userId);
        const userName = user.firstName + " " + user.lastName;
        const newReview = new Review({
            userId,
            comment, 
            userName,
            eventId,
            stars,
        })
        await newReview.save();
    }catch (error) {
    }
}
module.exports = {getReviewsByEventId, createReview};

