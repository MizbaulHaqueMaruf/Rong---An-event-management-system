import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import About from './components/about';
import LandingPage from './components/pages/landingPage';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './components/pages/home';
import Signup from './components/singup';
import Login from './components/login';
import Dashboard from './components/dashboard/Dashboard';
import Card from './components/dashboard/Card';
import EventRequest from './components/dashboard/EventRequest';
import OrganizerApproval from './components/dashboard/OrganizerApproval.jsx';
import OrgList from './components/dashboard/OrgList';
import Category from './components/dashboard/Category.jsx';


function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  
  const admin=localStorage.getItem("token");

  return (

    <Routes>
      {admin && <Route path="/admin-dash" exact element={<Dashboard/>}   />}
      <Route path="/admin-signup" exact element={<Signup/>}   />
      <Route path="/admin-login" exact element={<Login/>}   />
      {admin && <Route path="/event-request" exact element={<EventRequest/>} />}
      <Route path="/admin-dash" exact element={<Navigate replace to="/admin-login"/>}/>
      {admin && <Route path="/organizer-approval" exact element={<OrganizerApproval/>} />}
      {admin && <Route path="/organization-list" exact element={<OrgList/>} />}
      {admin && <Route path="/category" exact element={<Category/>} />}
      <Route path="/home" exact element={<LandingPage/>} />
    </Routes>
  );
}
export default App;

/*
<BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="home" element={isAuth? <LandingPage/> :<Navigate to="/"/>} />
        </Routes>


      </BrowserRouter>
      */