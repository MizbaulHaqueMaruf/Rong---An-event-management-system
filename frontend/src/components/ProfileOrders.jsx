/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const ProfileOrders = (user) => {
  // Hardcoded post data
  const [order, setOrder] = useState([]);
 useEffect(() => {
    console.log(user.user._id);
    fetch(`http://localhost:5000/userAPI/Customer/getOrders/${user.user._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setOrder(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [user]);
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={order?.eventDetailes?.images[0]} alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {order?.eventTitle}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <div className="flex space-x-2">
            <p>{new Date(order?.eventDetailes?.eventDate).toString().slice(0, 15)}</p>
            <p>{new Date(order?.eventDetails?.eventDate).toString().slice(16, 24)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOrders;
