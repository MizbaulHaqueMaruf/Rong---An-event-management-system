
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Cancel from './pages/Cancel'
import EventDetails from "./pages/EventDetails"
import Home from './pages/Home'
import Login from "./pages/Login"
import Profile from './pages/Profile'
import Register from "./pages/Register"
import Success from "./pages/Success"

const App = () => {


  
  return (
      <UserContextProvider>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/search/:prompt" element={<Home/>}/> 
      <Route exact path="/profile/:id" element={<Profile/>}/>
      <Route exact path="/eventdetails/:id" element={<EventDetails/>}/>
      <Route exact path="/payment/success/:id" element={<Success/>}/>
      <Route exact path="/payment/cancel" element={<Cancel/>}/>
      </Routes>
      </UserContextProvider>
  )
}

export default App