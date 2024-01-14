/* eslint-disable react/prop-types */
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DummyImage from "../assets/Dhaka_folk_fest.jpg";
import { UserContext } from "../context/UserContext";
const ProfileOrders = ({ order }) => {
  const { userId } = useContext(UserContext);
  const handlePay= async()=>{
    const stripe  = await loadStripe("pk_test_51OWhCHHyOH1NkwnJ12v0lb1QHyopFCGdPU718AURyJ1puglQG8QeKfdJ8oVU67QVeNpNUhksv9a3TklM1TwQHRlG00xO0JxwVv")
    const platformBill = Math.ceil(order?.totalAmount *0.05);
    const body ={
        eventTitle: order?.eventDetails[0]?.name,
        customerId:userId,
        eventId:order?.eventDetails[0]?._id,
        sellerId:order?.sellerId,
        numberOfTickets: order?.numberOfSeats,
        unitPrice: order?.eventDetails[0]?.price,
        totalAmount: order?.totalAmount+ platformBill,
        platformCharge: platformBill,
        orderId:order._id,
    }
    console.log(body);
    const headers={
      "Content-Type": "application/json"
    }
    try {
      const response = await fetch("http://localhost:5000/eventAPI/Customer/events/create-checkout-session", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
      });

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
  }
  const handleDelete= async()=>{
    try{
      const res=await axios.delete(`http://localhost:5000/eventAPI/Customer/events/deleteOrder/${order?._id}`);
      console.log(res);
      window.location.reload();
    } catch (error) {
        console.log(error);
    }
  }
  const formatDate = (dateString) => {
    if (dateString) {
      return new Date(dateString).toString().slice(0, 24);
    } else {
      // If date is not available, add a default or random date
      return "Will be Updated";
    }
  };

  useEffect(() => {
    console.log(order.eventDetails[0]._id);
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="flex">
        {/* left */}
        <div className="w-[35%] h-[200px] flex justify-center items-center">
          <img
            src={order?.eventDetails[0]?.images[0] || DummyImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* right */}
        <div className="flex flex-col w-[65%] p-4">
          <Link to={`/eventDetails/${order?.eventDetails[0]?._id}`}>
            <h1 className="text-xl font-bold mb-2 cursor-pointer hover:underline">
              {order?.eventTitle}
            </h1>
          </Link>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between">
            <div className="flex flex-col">
              <p style={{ marginBottom: '8px' }}>Event Date: {formatDate(order?.eventDetails[0]?.eventDate)}</p>
              <p className="font-bold text-black">Amount to Be Paid: {order?.totalAmount}BDT</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-white font-semibold bg-black px-2 py-1 hover:bg-gray-700 rounded" onClick={handlePay}>
                Pay
              </button>
              <button className="text-white font-semibold bg-red-500 px-2 py-1 hover:bg-red-600 rounded" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileOrders;
