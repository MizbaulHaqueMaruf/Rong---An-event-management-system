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

const CardOrg = ({ title, email, link, id }) => {
  const [approveClicked, setApproveClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);

  const sendMail = async () => {
    await fetch(`http://localhost:5000/api/data/send-mail/${id}`, { method: 'POST' });
  };

  const approveSeller = async () => {
   // event.preventDefault();
   setApproveClicked(prevState => !prevState);
    await fetch(`http://localhost:5000/api/data/seller-approve/${id}`, { method: 'POST' });
  };

  const rejectSeller = async () => {
    setRejectClicked(prevState => !prevState);
    //event.preventDefault();
    setRejectClicked(true);
    await fetch(`http://localhost:5000/api/data/seller-reject/${id}`, { method: 'POST' });
  };
  return (
    <div className="card-containerr">
      {title && <h1 className="card-titler">{title}</h1>}
      {email && (
        <p className="card-info-itemr">
          <strong>Email:</strong> {email}
        </p>
      )}
       <a href={link} onClick={sendMail} className="card-btnr">
        Send Email
      </a>
      <a href={link} onClick={approveSeller} className="card-btnr" style={{ color: approveClicked ? 'green' : 'white' }}>
        Approve
      </a>
      <a href={link} onClick={rejectSeller} className="card-btnr" style={{ color: rejectClicked ? 'red' : 'white' }}>
        Reject
      </a>
    </div>
  );
};


export default CardOrg;
