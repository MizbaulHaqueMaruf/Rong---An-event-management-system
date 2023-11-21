import React, { useState } from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck,BsBoxArrowRight, BsMenuButtonWideFill, BsFillGearFill, BsFillFolderFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <u style={{color:'#9e9ea4'}}>RONG-Admin Panel</u>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/admin-dash">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/organization-list">
                    <BsFillArchiveFill className='icon'/> Organizations
                    
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/organizer-approval">
                    <BsPeopleFill className='icon'/> Organizer Approval
                </a>
            </li>
             <li className='sidebar-list-item'>
                <a href="/event-request">
                    <BsFillGrid3X3GapFill className='icon'/> Event Requests
                </a>
            </li> 
            
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Settings
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                <a href="/category">
                <BsFillFolderFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/admin-login" onClick={handleLogout}>
                    <BsBoxArrowRight  className='icon'/> Logout
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar




/*
<li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>*/