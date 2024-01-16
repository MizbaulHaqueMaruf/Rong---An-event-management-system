// Import necessary modules
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Review = () => {
  // State and context setup
  const { isLoggedIn, userId } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Pagination settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle star click
  const handleStarClick = (rating) => {
    setUserRating(rating);
  }

  // Function to submit a review
  const submitReview = async () => {
    try {
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }

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
        window.location.reload();
        // Update reviews dynamically
        const updatedReviews = [...reviews, { userName: 'You', comment: userComment, stars: userRating }];
        setReviews(updatedReviews);

        // Reset user input
        setUserRating(0);
        setUserComment('');
      } else {
        // Failed to submit review
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Effect to fetch reviews on component mount or when the event ID changes
  useEffect(() => {
    console.log("Fetching reviews details for event ID:", id);
    fetch(`http://localhost:5000/reviewAPI/Customer/events/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setReviews(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);

  // Pagination logic
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-6 flex">
      {/* Section for displaying other users' reviews */}
      <div className="flex flex-col items-start w-2/3 pr-8 ml-10">
        <h2 className="text-2xl font-bold mb-4">Top Reviews</h2>
        {currentReviews.map((review) => (
         <div key={review.userName} className="mb-4 p-4 bg-gray-100 rounded-lg w-2/3">
         <p className="text-lg font-semibold">{review.userName}</p>
         <p className="text-gray-600 mb-2"><span className="text-yellow-500">{review.stars}/5</span></p>
         <p className="italic">{review.comment}</p>
       </div>
        ))}
        {/* Pagination */}
        <div className="flex mt-4">
          {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 focus:outline-none rounded ${currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Section for leaving a review */}
      <div className="w-1/3 mr-5">
        <h2 className="text-2xl font-bold mb-4">Leave Your Review</h2>

        {/* Star rating section */}
        <div className="flex items-center mb-4">
          <p className="mr-2">Your Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className={`text-2xl ${userRating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              &#9733;
            </button>
          ))}
        </div>

        {/* Comment box */}
        <div className="mb-4">
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
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-black"
          onClick={submitReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Review;
