import gravatar from "gravatar";
import PropTypes from "prop-types"; // Import prop-types package


const ProfileSection = ({ user }) => {
  const email = user.email; // Change this to the actual email property in your user data
  const gravatarImage = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "identicon",
  });

  return (
    <div className="bg-white rounded-md shadow-md p-4 w-991 h-250 relative">
      <div className="absolute bottom-0 left-4">
        <img
          src={gravatarImage}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-white"
        />
      </div>
      <div className="ml-24">
        <h1 className="text-xl font-semibold">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-500 text-sm">Joined on: {user.joinDate}</p>
        <div className="mt-4 space-x-4">
          <button className="text-gray-600 font-semibold hover:underline">Home</button>
          <button className="text-gray-600 font-semibold hover:underline">Orders</button>
          <button className="text-gray-600 font-semibold hover:underline">About</button>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes validation
ProfileSection.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired, // Change the type if joinDate is different
  }).isRequired,
};

export default ProfileSection;
