import { useEffect, useState } from 'react';

const EventOrganizer = (event) => {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    console.log("Fetching event details for ID:", event.event);
    fetch(`http://localhost:5000/eventAPI/Customer/events/seller/${event.event}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setSellerData(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [event.event]);

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-2">Seller Name: {sellerData?.name}</p>
        <div className="flex flex-wrap gap-4">
          <p className="text-gray-600">
            <a href={`mailto:${sellerData?.email}`} className="underline">
              Seller Email : {sellerData?.email}
            </a>
          </p>
          <p className="text-gray-600">
            Seller Organization: {sellerData?.organization?.name}
          </p>
          <p className="text-gray-600">
            Organization Description: {sellerData?.organization?.description}
          </p>
          <p className="text-gray-600">
            <a href={`mailto:${sellerData?.organization?.email}`} className="underline">
              Organization Email : {sellerData?.organization?.email}
            </a>
          </p>
          <p className="text-gray-600">
            <a href={sellerData?.organization?.website} target="_blank" rel="noopener noreferrer" className="underline">
              Organization Website : {sellerData?.organization?.website}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizer;
