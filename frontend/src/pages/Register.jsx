import axios from 'axios'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import RongLogo from '../assets/ronglogo.jpg'
import Footer from "../components/Footer"
import { URL } from '../url'

const Register = () => {

  const [firstName,setfirstName]=useState("")
  const [lastName,setlastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()
   
  const handleRegister=async ()=>{
    
    try{

      const res=await axios.post(URL+"/customerApi/Customer/register",{firstName,lastName,email,password})
      setfirstName(res.data.firstName)
      setlastName(res.data.lastName)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")
      
    }
    catch(err){
      setError(true)
      console.log(err)
    }

  }

  

  return (
    <>
      <div className="bg-black flex items-center justify-between px-6 md:px-[40px] py-4">
      <Link to="/">
          <img src={RongLogo} alt="Rong Logo" className="h-8 cursor-pointer" />
    </Link>
    <h3 className='text-white'><Link to="/login">Login</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Create an account</h1>
         <input onChange={(e)=>setfirstName(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your First Name" />
         <input onChange={(e)=>setlastName(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your Last Name" />
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Register