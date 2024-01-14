/* eslint-disable react/prop-types */
import { useEffect } from "react";
import DummyImage from "../assets/Dhaka_folk_fest.jpg";
const ProfileOrders = ({order}) => {
  const formatDate = (dateString) => {
    if (dateString) {
      return new Date(dateString).toString().slice(0, 24);
    } else {
      // If date is not available, add a default or random date
      return "Not Mentioned";
    }
  };
  useEffect(()=>{
    console.log(order);
  })
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img 
          src={order?.eventDetailes?.images[0] || DummyImage} 
          alt="" 
          className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {order?.eventTitle}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <div className="flex space-x-2">
            <p>{formatDate(order?.eventDetailes?.eventDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOrders;
