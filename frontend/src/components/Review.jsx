import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Review = () => {
  const {isLoggedIn, userId } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const { id } = useParams()
  const navigate = useNavigate();
  const handleStarClick = (rating) => {
    // Set the user's selected rating
    setUserRating(rating);
  }
  const submitReview = async () => {
    try {
      // Make a POST request to submit the review to the backend
      if(!isLoggedIn) {
        navigate('/login');
        return;
      }
      console.log(userId, id, userRating, userComment);
      const response = await fetch('http://localhost:5000/reviewAPI/Customer/events/submitReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, 
          eventId: id,
          stars: userRating,
          comment: userComment,
        }),
      });

      if (response.ok) {
        // Successfully submitted review
        console.log('Review submitted successfully');
        // Optionally, you can fetch updated reviews after submission
      } else {
        // Failed to submit review
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  useEffect(() => {
    console.log("Fetching reviews details for event ID:", id);
    fetch(`http://localhost:5000/reviewAPI/Customer/events/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setReviews(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));
    
  },[id]); 
  return (
    <div className="mt-6 flex flex-col items-center">
    {/* Section for displaying other users' reviews */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Reviews</h2>
      {reviews && reviews.map((review) => (
        <div key={review.userName} className="mb-4">
          <p>{review.userName}</p>
          <p>{review.comment}</p>
          <p>Rating: {review.stars} stars</p>
          {/* Add additional information if needed */}
        </div>
      ))}
    </div>

    {/* Section for leaving a review */}
    <div className="w-1/2">
      <h2 className="text-2xl font-bold mb-4">Leave Your Review</h2>

      {/* Star rating section */}
      <div className="flex items-center mb-4">
        <p className="mr-2">Your Rating:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            className={`text-2xl ${
              userRating >= star ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            &#9733;
          </button>
        ))}
      </div>

      {/* Comment box */}
      <div>
        <label htmlFor="comment" className="block text-gray-600 mb-2">
          Your Comment:
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          className="w-full border p-2 rounded"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>
      </div>

      {/* Submit button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        onClick={submitReview}
      >
        Submit Review
      </button>
    </div>
  </div>
  )
}

export default Review
