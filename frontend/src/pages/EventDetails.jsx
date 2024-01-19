/* eslint-disable react-hooks/exhaustive-deps */
import { loadStripe } from "@stripe/stripe-js";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../assets/Dhaka_folk_fest.jpg";
import EventOrganizer from "../components/EventOrganizer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Review from "../components/Review";
import { UserContext } from "../context/UserContext";
const EventDetails = (key, event) => {
  const { isLoggedIn, userId } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("home");
  const [eventData, setEventData] = useState(null);
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailure, setPaymentFailure] = useState(false);
  const [numTickets, setNumTickets] = useState(0);
  const navigate = useNavigate();
  
  const handlePayNow = async ()=>{
    const stripe  = await loadStripe("pk_test_51OWhCHHyOH1NkwnJ12v0lb1QHyopFCGdPU718AURyJ1puglQG8QeKfdJ8oVU67QVeNpNUhksv9a3TklM1TwQHRlG00xO0JxwVv")
    const platformBill = Math.ceil(totalPrice *0.05);
    const body ={
        eventTitle: eventData?.name,
        customerId:userId,
        eventId:eventData?._id,
        sellerId:eventData?.sellerId,
        numberOfTickets: numTickets,
        unitPrice: eventData?.price,
        totalAmount: totalPrice+ platformBill,
        platformCharge: platformBill,
        orderId:order._id,
        discount:eventData?.discount
    }
    console.log(body);
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/eventAPI/Customer/events/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();
      console.log(session);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleNumTicketsChange = (e) => {
    const tickets = parseInt(e.target.value, 10);
    setNumTickets(tickets);
  };

  const totalPrice = numTickets * (eventData?.price || 100);
  const isDisabled = numTickets === 0;
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      if(numTickets> eventData.stock){
        setPaymentFailure(true);
        return;
      }
      // Make a POST request to the backend to create an order
      const response = await fetch(
        "http://localhost:5000/eventAPI/Customer/events/orderEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventTitle: eventData.name,
            sellerId: eventData.sellerId,
            eventOrganizer: eventData.orgName,
            eventId: eventData._id,
            UserId: userId,
            totalAmount: totalPrice,
            numberOfTickets: numTickets,
            isPaid: false,
          }),
        }
      );

      if (response.ok) {
        const newOrder = await response.json();
        setOrder(newOrder);
        console.log(order);
        eventData.stock = eventData.stock - numTickets;
        setPaymentSuccess(true); // Show success pop-up
      } else {
        setPaymentFailure(true); // Show failure pop-up
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentFailure(true); // Show failure pop-up
    }
  };
  useEffect(() => {
    console.log("Fetching event details for ID:", id);
  
    fetch(`http://localhost:5000/eventAPI/Customer/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        console.log("Latitude type:",  data.latitude);
        console.log("Longitude type:",  data.longitude);
        setEventData(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);
  
  useEffect(() =>{
      console.log(key);
      console.log(event);
  });
  return (
    <div>
      <Navbar />
      <div className="relative h-1/3">
        <img
          src={
            eventData?.images && eventData.images.length > 0
              ? eventData.images[0]
              : image1
          }
          alt={eventData?.name || "Event Image"}
          className="w-full h-32 md:h-48 object-cover rounded-t-lg"
        />
      </div>
      <div className="mt-6">
        <div className="flex space-x-4">
          <button
            className={`${
              activeTab === "home"
                ? "text-black font-bold text-base underline"
                : "text-gray-500 hover:text-black font-bold"
            } py-2 px-4 `}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`${
              activeTab === "organizer"
              ? "text-black font-bold text-base underline"
              : "text-gray-500 hover:text-black font-bold"
          } py-2 px-4 `}
            onClick={() => setActiveTab("organizer")}
          >
            Organizer Info
          </button>
          <button
            className={`${
              activeTab === "Place Order"
              ? "text-black font-bold text-base underline"
              : "text-gray-500 hover:text-black font-bold"
          } py-2 px-4 `}
            onClick={() => setActiveTab("Place Order")}
          >
            Place Order
          </button>
          <button
            className={`${
              activeTab === "reviews"
              ? "text-black font-bold text-base underline"
                : "text-gray-500 hover:text-black font-bold"
            } py-2 px-4 `}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
        <hr className="my-2 border-t border-gray-300" />
        {activeTab === "home" && (
  <div className="mt-16 flex space-x-4">
    <div className="w-1/3 ml-60">
      <div className="bg-white p-4 rounded shadow text-center ml-4 mr-10 mb-10">
        <div className="text-2xl font-bold text-black mb-4 shadow-2xl">
          About This Event
        </div>
        <div className="max-h-60 overflow-y-auto">
          {eventData?.description || "Description"}
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow ml-4 mr-10">
        <div className="text-2xl text-center font-bold text-black mb-4 shadow-2xl">
          Location
        </div>
        <div>
          {/* Add the map here */}
          {eventData && (
            <MapContainer
              center={[eventData?.latitude || 0.0, eventData?.longitude || 0.0]}
              zoom={13}
              style={{ height: "200px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {eventData && (
                <Marker position={[eventData?.latitude || 0.0, eventData?.longitude || 0.0]}>
                  <Popup>Location</Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
    <div className="w-1/3 mr-100">
    <div className="bg-white p-4 rounded shadow text-center ml-4 mr-10 mb-10">
        <div className="text-2xl font-bold text-black mb-4 shadow-2xl">
          Event Images
        </div>
        <img
          src={
            eventData?.images && eventData.images.length > 0
              ? eventData.images[0]
              : image1
          }
          alt={eventData?.name || "Event Image"}
          className="w-full h-32 md:h-48 object-cover rounded-t-lg"
        />
        <div className="mt-10 mb-10"></div>
          <img
          src={
            eventData?.images && eventData.images.length > 0
              ? eventData.images[1]
              : image1
          }
          alt={eventData?.name || "Event Image"}
          className="w-full h-32 md:h-48 object-cover rounded-t-lg"
        />
      </div>
    </div>
  </div>
)}


        {activeTab === "organizer" && (
          <div className="mt-6 flex flex-col items-center">
            <EventOrganizer event={id} />
          </div>
        )}
        {activeTab === "Place Order" && (
        <div className="mt-6 flex justify-center">
        <div className="bg-green-200 p-6 rounded-lg shadow-lg text-center text-black">
          <div className="text-xl font-semibold">
            Price for Each Seat: {eventData?.price || 100}
          </div>
              <div className="mt-4">
              <form className="my-4">
          <label className="text-base text-gray-700 font-semibold text-pretty">Number of Tickets:</label>
          <select
            id="numTickets"
            name="numTickets"
            value={numTickets}
            onChange={handleNumTicketsChange}
            className="border rounded-md p-2 mx-2"
          >
            {[0, 1, 2, 3, 4, 5].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p></p>
          <p></p>
          <div className="text-base text-pretty text-black font-bold my-2 mb-5">Total Amount: {totalPrice}</div>
    
          <button
            className="bg-emerald-500 text-black font-bold py-2 px-4 rounded hover:bg-green-950"
            onClick={handlePlaceOrder}
            disabled={isDisabled}
          >
            Place Order
          </button>
        </form>
        <p className="text-lg font-bold text-black text-pretty text-wrap my-2">Payment Instructions:</p>
        <p className="text-sm text-black text-pretty text-wrap font-bold">
          You will be redirected to Stripe for payment 
        </p>
        <p className="text-sm text-gray-700 font-bold text-wrap">
         Use Visa Card or Credit Card to purchase. Have valid credit card number 
        </p>
              </div>
              {/* Pop-up for payment success */}
              {paymentSuccess && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-sm mx-auto my-6">
                    <div className="bg-white rounded shadow-lg p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">
                          Order Placed Successful!
                        </h3>
                        <p>
                          Your order has been placed successfully. You need to
                          pay {totalPrice} Taka{" "}
                        </p>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          className="bg-gray-700 text-white text-sm py-2 px-4 rounded mr-10 hover:bg-black focus:outline-none ml-4"
                          onClick={handlePayNow}
                        >
                          Go to Payment
                        </button>
                        <button
                          className="bg-gray-700  text-white text-sm py-2 px-4 rounded hover:bg-black focus:outline-none"
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
                        <h3 className="text-lg font-semibold mb-2">
                          Order Unsuccessful!
                        </h3>
                        <p>
                          There was an issue processing your order. Please try
                          again later.
                        </p>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          className="bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
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

        {activeTab === "reviews" && <Review />}
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
