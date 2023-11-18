import React, { useEffect, useState } from "react";
import CardOrg from "./CardOrg";

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch(  "http://localhost:5000/api/data/insert-data")
      .then((response) => response.json())
      .then((data) => setOrganizations(data))
      .catch((error) => console.error("Error fetching organizations:", error));
  }, []);

  return (
    <div className="organization-list-container">
      {organizations.map((org) => (
        <CardOrg
          title={org.name}
          description={org.description}
          email={org.email}
          website={org.website}
        />
      ))}
    </div>
  );
};

export default OrganizationList;
