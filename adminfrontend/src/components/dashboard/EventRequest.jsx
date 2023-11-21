import Sidebar from "./Sidebar";
import Header from './Header';
import Home from "./Home";
import Card from "./Card";
import { useState } from 'react'
import './App.css'
import RequestPage from "./RequestPage";
function EventRequest(){
    


    return(
        <div className="cover"  >
            <div className='grid-container' >
            <Header/>
            <Sidebar/>
            <RequestPage/>
            </div>

        </div>
        

    );
};

export default EventRequest;