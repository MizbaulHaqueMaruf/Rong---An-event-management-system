import React, { useEffect, useState } from "react";
import CardOrg from "./CardOrg";

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data/insert-data")
      .then((response) => response.json())
      .then((data) => {
        const filteredOrganizations = data.filter((org) => org.flag === true);
        setOrganizations(filteredOrganizations);
      })
      .catch((error) => console.error("Error fetching organizations:", error));
  }, []);

  return (
    <div className="organization-list-container">
      {organizations.map((org) => (
        <CardOrg
          key={org._id}
          title={org.name}
          id={org._id}
          email={org.email}
        />
      ))}
    </div>
  );
};

export default OrganizationList;


/*import React, { useEffect, useState } from "react";

const SellerList = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/request-seller-get")
      .then((response) => response.json())
      .then((data) => setSellers(data.sellers))
      .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  return (
    <div className="seller-list-container">
      <h1>Seller Requests</h1>
      <ul>
        {sellers?.map((seller) => (
          <li key={seller._id}>
            <strong>Name:</strong> {seller.name}, <strong>Email:</strong> {seller.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerList;
*/