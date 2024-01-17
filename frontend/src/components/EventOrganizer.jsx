import { useEffect, useState } from 'react';

const EventOrganizer = ( event ) => {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/eventAPI/Customer/events/seller/${event.event}`)
      .then((response) => response.json())
      .then((data) => setSellerData(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [event.event]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="text-center">
        <p className="text-2xl font-semibold mb-2">Seller Information</p>
        <p className="text-lg font-semibold mb-1">Seller Name: {sellerData?.name}</p>
        <p className="text-gray-600">
          <a href={`mailto:${sellerData?.email}`} className="underline hover:text-blue-500">
            Seller Email: {sellerData?.email}
          </a>
        </p>
        <p className="text-gray-600 font-bold">Organized by: {sellerData?.organization?.orgName}</p>
        <p className="text-gray-600">
        {sellerData?.organization?.sub_district}, 
        </p>
        <p className="text-gray-600">
            {sellerData?.organization?.district}, {sellerData?.organization?.division}
        </p>
      </div>
    </div>
  );
};

export default EventOrganizer;
