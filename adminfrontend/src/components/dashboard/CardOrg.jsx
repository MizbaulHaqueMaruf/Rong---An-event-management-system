import React, { useState } from "react";
import "./CardOrg.css";


const CardOrg = ({ title, email, link, id }) => {
  const [approveClicked, setApproveClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);

  const sendMail = async () => {
    const mailBody = window.prompt("Enter your message:");
    window.alert("Mail has been sent to the seller.");
    await fetch(`http://localhost:5000/api/data/send-mail/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mailBody }),
      
    });
    window.alert("Mail has been sent to the seller.");
  };

  const approveSeller = async () => {
   // event.preventDefault();
   setApproveClicked(prevState => !prevState);
    await fetch(`http://localhost:5000/api/data/seller-approve/${id}`, { method: 'POST' });
    window.alert("Seller has been approved.");
    window.location.reload();
  };

  const rejectSeller = async () => {
    setRejectClicked(prevState => !prevState);
    //event.preventDefault();
    setRejectClicked(true);
    await fetch(`http://localhost:5000/api/data/seller-reject/${id}`, { method: 'POST' });
    window.alert("Seller has been rejected.");
    window.location.reload();
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
        Ask for documents
      </a>
      <a href={link} onClick={approveSeller} className="card-btnr" style={{ backgroundColor: approveClicked ? '#2b333a' : '#324672' }}>
        Approve
      </a>
      <a href={link} onClick={rejectSeller} className="card-btnr" style={{ backgroundColor: rejectClicked ? '#2b333a' : '#324672' }}>
        Reject
      </a>
    </div>
  );
};


export default CardOrg;
