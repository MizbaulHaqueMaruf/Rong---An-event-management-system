import "leaflet/dist/leaflet.css"; // Import the Leaflet CSS
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../assets/Dhaka_folk_fest.jpg";
import EventOrganizer from "../components/EventOrganizer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const EventDetails = () => {
  const {isLoggedIn, userId } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("home");
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailure, setPaymentFailure] = useState(false);
  const navigate = useNavigate();
  let latitude = 0;
  let longitude = 0;
  const handlePayNow = async ()=>{
    
  }
  const handlePlaceOrder = async () => {
    try {
      if(!isLoggedIn) {
            navigate('/login');
            return;
      }
      // Make a POST request to the backend to create an order
      const response = await fetch('http://localhost:5000/eventAPI/Customer/evets/orderEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTitle: eventData.name,
          eventOrganizer: eventData.orgName,
          eventId : eventData._id,
          UserId: userId,
        }),
      });

      if (response.ok) {
        setPaymentSuccess(true); // Show success pop-up
      } else {
        setPaymentFailure(true); // Show failure pop-up
      }
    } catch (error) {
      console.error('Error during payment:', error);
      setPaymentFailure(true); // Show failure pop-up
    }
  };
  useEffect(() => {
    console.log("Fetching event details for ID:", id);
  
    fetch(`http://localhost:5000/eventAPI/Customer/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setEventData(data);
        if (eventData.latitude && eventData.longitude) {
          latitude = eventData?.latitude;
          longitude = eventData?.longitude;
        }
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);  
  return (
    <div>
      <Navbar />
      <div className="relative h-1/3">
      <img
        src={eventData?.images && eventData.images.length > 0 ? eventData.images[0] : image1}
        alt={eventData?.name || 'Event Image'}
        className="w-full h-32 md:h-48 object-cover rounded-t-lg"
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
              activeTab === "Place Order"
                ? "bg-transparent text-blue-500 hover:bg-blue-100"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            } py-2 px-4 rounded`}
            onClick={() => setActiveTab("Place Order")}
          >
            Place Order
          </button>
        </div>
       {activeTab === "home" && (
  <div className="mt-6 flex space-x-4">
    <div className="w-1/4 ml-10 mr-20">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-2xl text-center font-bold text-black mb-4 rounded shadow-2xl">
          Time
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
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup>Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
    <div className="w-3/4 ml-100">
      <div className="bg-white p-4 rounded shadow text-center w-3/4 ml-100">
        <div className="text-2xl font-bold text-black mb-4 shadow-2xl">
         Description
        </div>
        <div className="max-h-60 overflow-y-auto">
          {eventData?.description || "Description"} 
        </div>
      </div>
    </div>
  </div>
)}


        {activeTab === "organizer" && (
          <div className="mt-6 flex flex-col items-center">
            <EventOrganizer event={id}/>
          </div>
        )}
        {activeTab === "Place Order" && (
          <div className="mt-6 flex justify-center">
            <div className="bg-blue-100 p-8 rounded-lg shadow-lg text-center">
              <div className="text-xl font-semibold">Total Amount: {eventData?.price || 100 }</div>
              <p className="text-base text-gray-600 my-2">Payment Options:</p>
              <p className="text-sm text-gray-500">
                You can pay via any media
              </p>
              <p className="text-sm text-gray-500">
                Bkash or Nagad. Use any method you prefer.
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
              {/* Pop-up for payment success */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="bg-white rounded shadow-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Order Placed Successful!</h3>
                <p>Your order has been placed successfully.</p>
              </div>
              <div className="text-center mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={handlePayNow}
                >
                 Pay
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={() => setPaymentSuccess(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up for payment failure */}
      {paymentFailure && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="bg-white rounded shadow-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Payment Unsuccessful!</h3>
                <p>There was an issue processing your payment. Please try again later.</p>
              </div>
              <div className="text-center mt-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
                  onClick={() => setPaymentFailure(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;