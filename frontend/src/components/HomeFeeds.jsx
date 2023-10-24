import PropTypes from "prop-types";

const EventCard = ({ event }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-4">
    <div className="bg-white rounded-lg shadow-md h-full">
      <img src={event.photo} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4 h-36">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
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
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

const HomeFeeds = () => {
  const events = [
    {
      id: 1,
      title: "3rd National Science Festival",
      event_organizer: "Walton",
      updatedAt: new Date(), // Make sure updatedAt is a valid date
      desc:
        "The National Science Festival is a significant event in various countries, dedicated and the general public to celebrate and explore various aspects of science and technology. ",
      photo: "../assets/3rd_National_Science_Festival.jpg",
    },
    {
      id: 2,
      title: "George Strait Epic Concert",
      event_organizer: "GS Foundation",
      updatedAt: new Date(), // Make sure updatedAt is a valid date
      desc: "One of the greatest concerts of a lifetime",
      photo: "../assets/GeorgeStrait_concert.jpg",
    },
  ];

  return (
    <div className="w-full flex flex-wrap mt-8 space-x-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default HomeFeeds;
