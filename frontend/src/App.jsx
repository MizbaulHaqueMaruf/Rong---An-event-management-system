
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import Login from "./pages/Login"
import Profile from './pages/Profile'
import Register from "./pages/Register"
import EventDetails from "./pages/EventDetails"


const App = () => {


  
  return (
      <UserContextProvider>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/>
      <Route exact path="/eventdetails" element={<EventDetails/>}/>
      </Routes>
      </UserContextProvider>
  )
}

export default App