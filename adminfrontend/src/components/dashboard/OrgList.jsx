import React from "react";
import { Link } from 'react-router-dom';
import './App.css'
import "./OrgList.css"; // Import the CSS file
import 
 {BsFillBellFill,BsBoxArrowRight, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'


const approvedOrganizations = [
  "Green Living Advocates",
  "Creative Arts Studio",
  "Food for All Charity",
  ];
  

function OrgList() {
  return (
    <main>
        <header className='headerr'>
        <div className='dash'>
            <a href="/admin-dash"  style={{ fontSize: '27px', textAlign: 'center',color:'white', marginLeft:'620px'}}>
            <BsBoxArrowRight  className='icon'/> Dashboard
           </a> 
        </div>
        <div className='headerr-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
         <div className="approved-organizations-container" style={{paddingTop:'12px'}}>
        
        <h1>Approved Organizations</h1>
        <ul className="approved-organizations-list">
          {approvedOrganizations.map((organization, index) => (
            <li key={index}>{organization}</li>
          ))}
        </ul>
      </div>
    </main>
   
  );
}

export default OrgList;
