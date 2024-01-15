import PropTypes from "prop-types";
import { useState } from "react";

const UpdateForm = ({ handleClose, handleConfirmUpdate }) => {
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleUpdate = () => {
    // Check if passwords match before confirming the update
    if (updatedPassword === confirmPassword) {
      setPasswordsMatch(true);
      // You can add additional validation or processing logic here
      handleConfirmUpdate(updatedFirstName, updatedLastName, updatedPassword);
      handleClose();
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">Update Form</h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            First Name:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={updatedFirstName}
            onChange={(e) => setUpdatedFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={updatedLastName}
            onChange={(e) => setUpdatedLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded"
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            className={`w-full border border-gray-300 p-2 rounded ${
              !passwordsMatch ? "border-red-500" : ""
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm mt-2">
              Passwords do not match. Please try again.
            </p>
          )}
        </div>
        <button
          onClick={handleUpdate}
          className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded"
        >
          Confirm Update
        </button>
        <button
          onClick={handleClose}
          className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded ml-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

UpdateForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirmUpdate: PropTypes.func.isRequired,
};

export default UpdateForm;
