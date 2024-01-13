const express = require('express');
const router = express.Router();

const{ getReviewsByEventId, createReview} = require("../../controllers/Review/reviewController");

//get all the reviews
router.get('/Customer/events/reviews/:id', getReviewsByEventId);
//create review
router.post('/Customer/events/submitReview', createReview);

module.exports = router;
