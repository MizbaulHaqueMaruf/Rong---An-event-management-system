import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import image5 from "../assets/Dhaka_folk_fest.jpg"; // New image
import image4 from "../assets/Sailor_run_bangla.jpg"; // New image
import image1 from "../assets/image_of Hackathon.jpg";
import image3 from "../assets/image_of_Cassini_hackathon.jpg"; // New image
import image6 from "../assets/image_of_Chittagong_SC.jpg"; // New image
import image2 from "../assets/image_of_MIST_olympiad.jpg"; // Fixed image filename

const EventCard = ({ event }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4">
    <div className="bg-white rounded-lg shadow-md">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-32 md:h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <Link to="/eventdetails" className="hover:underline">
          <h2 className="text-lg md:text-xl font-bold mb-2">{event.title}</h2>
        </Link>
        <p className="text-sm text-gray-500">@{event.event_organizer}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <p>{event.updatedAt.toLocaleDateString()}</p>
          <p>{event.updatedAt.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    event_organizer: PropTypes.string.isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
    desc: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // New image property
  }).isRequired,
};

const HomeFeeds = () => {
  const events = [
    {
      id: 1,
      title: "CUSS Science Festival",
      event_organizer: "CUSS",
      updatedAt: new Date(),
      desc:
        "The National Science Festival is a significant event in various countries, dedicated to the general public to celebrate and explore various aspects of science and technology.",
      image: image6, // Add image property
    },
    {
      id: 2,
      title: "MIST Olympiad Bee",
      event_organizer: "MIST Math Club",
      updatedAt: new Date(),
      desc: "Hackathon festival",
      image: image2, // Add image property
    },
    {
      id: 3,
      title: "Cassini Hackathon Festival",
      event_organizer: "Cassini Foundation",
      updatedAt: new Date(),
      desc: "Explore the latest in technology and innovation at Tech Expo 2023.",
      image: image3, // Add image property
    },
    {
      id: 4,
      title: "Sailor Run for Bangladesh",
      event_organizer: "Sailor",
      updatedAt: new Date(),
      desc: "Celebrate art, culture, and creativity at this cultural fair.",
      image: image4, // Add image property
    },
    {
      id: 5,
      title: "Dhaka Lit Festival",
      event_organizer: "Lit Carnival",
      updatedAt: new Date(),
      desc: "Learn about sustainable and green energy solutions at this symposium.",
      image: image5, // Add image property
    },
    {
      id: 6,
      title: "SIH Intra Hackathon Festival",
      event_organizer: "SIH Computer Club",
      updatedAt: new Date(),
      desc:
        "The National Science Festival is a significant event in various countries, dedicated to the general public to celebrate and explore various aspects of science and technology.",
      image: image1, // Add image property
    },
  ];

  return (
    <div className="w-full mt-8">
      <div className="flex flex-wrap -mx-2 md:-mx-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeeds;
