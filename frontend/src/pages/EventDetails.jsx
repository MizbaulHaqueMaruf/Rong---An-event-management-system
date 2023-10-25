import "leaflet/dist/leaflet.css"; // Import the Leaflet CSS
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import image1 from "../assets/image_of_Chittagong_SC.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <Navbar />
      <div className="relative h-1/3">
        <img
          src={image1}
          alt="Event"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-6">
        <div className="flex space-x-4">
          <button
            className={`${
              activeTab === "home"
                ? "bg-transparent text-blue-500 hover:bg-blue-100"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            } py-2 px-4 rounded`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`${
              activeTab === "organizer"
                ? "bg-transparent text-blue-500 hover:bg-blue-100"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            } py-2 px-4 rounded`}
            onClick={() => setActiveTab("organizer")}
          >
            Organizer Info
          </button>
          <button
            className={`${
              activeTab === "register"
                ? "bg-transparent text-blue-500 hover:bg-blue-100"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            } py-2 px-4 rounded`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className={`${
              activeTab === "payment"
                ? "bg-transparent text-blue-500 hover:bg-blue-100"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            } py-2 px-4 rounded`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
        </div>
       {activeTab === "home" && (
  <div className="mt-6 flex space-x-4">
    <div className="w-1/4 ml-10 mr-20">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-2xl text-center font-bold text-black mb-4 rounded shadow-2xl">
          Event Time
        </div>
        <div className="text-center">12:00 PM - 3:00 PM</div>
      </div>
      <div className="bg-white p-4 text-center">
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-2xl text-center font-bold text-black mb-4 shadow-2xl">
          Location
        </div>
        <div>
          {/* Add the map here */}
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>Event Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
    <div className="w-3/4 ml-100">
      <div className="bg-white p-4 rounded shadow text-center w-3/4 ml-100">
        <div className="text-2xl font-bold text-black mb-4 shadow-2xl">
          Event Description
        </div>
        <div className="max-h-60 overflow-y-auto">
          CUSS presents National Science Fair is a prestigious and innovative scientific event that celebrates and showcases the remarkable achievements and discoveries of budding scientists, researchers, and inventors from all across the nation. This fair provides a platform for young minds to explore the wonders of science, technology, and innovation, fostering a spirit of curiosity and creativity.
          Participants at the fair have the opportunity to present their scientific projects, experiments, and inventions to a diverse audience, which includes experts, educators, and fellow enthusiasts. The event serves as a melting pot of knowledge, where attendees can learn about a wide range of scientific disciplines, from biology and physics to engineering and environmental science.
        </div>
      </div>
    </div>
  </div>
)}


        {activeTab === "organizer" && (
          <div className="mt-6 flex flex-col items-center">
      
          </div>
        )}
        {activeTab === "register" && (
          <div className="mt-6">
            {/* Register form */}
            {/* Implement your registration form here */}
          </div>
        )}
        {activeTab === "payment" && (
          <div className="mt-6 flex justify-center">
            <div className="bg-blue-100 p-8 rounded-lg shadow-lg text-center">
              <div className="text-xl font-semibold">Total Amount: $100</div>
              <p className="text-base text-gray-600 my-2">Payment Options:</p>
              <p className="text-sm text-gray-500">
                You can pay via any media
              </p>
              <p className="text-sm text-gray-500">
                Bkash or Nagad. Use any method you prefer.
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
