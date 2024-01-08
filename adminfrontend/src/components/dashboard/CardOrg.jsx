import React, { useState } from "react";
import "./CardOrg.css";

// const CardOrg = ({ title, description, email, website, buttonText, link }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Function to toggle the description expansion
//   const toggleDescription = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Determine the maximum number of words to display
//   const maxWords = isExpanded ? description.split(" ").length : 30;

//   // Get the part of the description to display
//   const displayDescription = description
//     .split(" ")
//     .slice(0, maxWords)
//     .join(" ");

//   return (
//     <div className="card-containerr">
//       {title && <h1 className="card-titler">{title}</h1>}
//       {displayDescription && (
//         <p className="card-descriptionr">
//           {displayDescription} {description.split(" ").length > 30 && !isExpanded && <span>...</span>}
//         </p>
//       )}
//       {description.split(" ").length > 30 && (
//         <span
//         onClick={toggleDescription}
//         className="read-more-link"
//         style={{color:"rgb(51, 51, 161)", paddingLeft:"18px"}}
//       >
//         {isExpanded ? "Show Less" : "Read More"}
//       </span>
//       )}
//       {buttonText && link && (
//         <a href={link} className="card-btnr">
//           {buttonText}
//         </a>
//       )}
//       {email && (
//         <p className="card-info-itemr">
//           <strong>Email:</strong> {email}
//         </p>
//       )}
//       {website && (
//         <p className="card-info-itemr">
//           <strong>Website:</strong>{" "}
//           <a
//             href={website}
//             style={{ color: "rgb(88, 121, 199)" }}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             {website}
//           </a>
//         </p>
//       )}
//        <a href={link} className="card-btnr">
//           Approve
//         </a>
//         <a href={link} className="card-btnr">
//           Reject
//         </a>
//     </div>
//   );
// };

const CardOrg = ({ title, email, link }) => {
  return (
    <div className="card-containerr">
      {title && <h1 className="card-titler">{title}</h1>}
      {email && (
        <p className="card-info-itemr">
          <strong>Email:</strong> {email}
        </p>
      )}
      <a href={link} className="card-btnr">
        Approve
      </a>
      <a href={link} className="card-btnr">
        Reject
      </a>
    </div>
  );
};


export default CardOrg;
