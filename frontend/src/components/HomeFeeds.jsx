import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DummyImage from "../assets/Dhaka_folk_fest.jpg";

// need to add the event dates to the <p> tags which are empty now 

const EventCard = ({ event }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4">
    <div className="bg-white rounded-lg shadow-md">
      <img
        src={event.images && event.images.length > 0 ? event.images[0] : DummyImage}
        alt={event.name}
        className="w-full h-32 md:h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
      <Link to={`/eventdetails/${event._id}`} className="hover:underline">
          <h2 className="text-lg md:text-xl font-bold mb-2">{event.name}</h2>
        </Link>
        <p className="text-sm text-gray-500">@{event.orgName}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <p> </p> 
          <p> </p>
        </div>
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    orgName: PropTypes.string.isRequired,
    images: PropTypes.array,
  }).isRequired,
};

const HomeFeeds = () => {
  const { key } = useParams();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 20;

  useEffect(() => {
    const url = key
      ? `http://localhost:5000/eventAPI/Customer/searchEvents/${key}`
      : `http://localhost:5000/eventAPI/Customer/events`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
            console.log(data);  
            setEvents(data);
        })
      .catch((error) => console.error("Error fetching events:", error));
  }, [currentPage, key]);
  
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full mt-8">
      <div className="flex flex-wrap -mx-2 md:-mx-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeFeeds;
