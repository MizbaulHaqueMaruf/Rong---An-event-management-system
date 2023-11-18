import Sidebar from "./Sidebar";
import Home from "./Home";
import Card from "./Card";
import { useState } from 'react'
import './App.css'
import Header from "./Header";
import RequestOrg from "./RequestOrg";
import OrganizationList from './dummy';

function OrganizerApproval(){
    
    return(
        <div className="cover">
            <div className='grid-container' >
            <Header/>
            <Sidebar/>
            <OrganizationList/>
            </div>
            </div>
        

    );
};

export default OrganizerApproval;