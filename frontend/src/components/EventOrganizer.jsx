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
        <p className="text-gray-600">Seller Organization: {sellerData?.organization?.name}</p>
        <p className="text-gray-600">Organization Description: {sellerData?.organization?.description}</p>
        <p className="text-gray-600">
          <a href={`mailto:${sellerData?.organization?.email}`} className="underline hover:text-blue-500">
            Organization Email: {sellerData?.organization?.email}
          </a>
        </p>
        <p className="text-gray-600">
          <a href={sellerData?.organization?.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
            Organization Website: {sellerData?.organization?.website}
          </a>
        </p>
      </div>
    </div>
  );
};

export default EventOrganizer;
