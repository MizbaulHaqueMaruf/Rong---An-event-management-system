/* eslint-disable react/prop-types */


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";


export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const [userId, setUserId] = useState(null);
    useEffect(()=>{
      getUser()

    },[])

    const getUser=async()=>{
      try{
        const res=await axios.get(URL+"/customerAPI/Customer/refetch",{withCredentials:true})
        // console.log(res.data)
        setUser(res.data)
        if (res.data && res.data._id) {
          setUserId(res.data._id); // Set userId if available in the response
        }
      } 
      catch(err){
        console.log(err)
      }
    }
    const isLoggedIn = user !== null;

    return (<UserContext.Provider value={{user,setUser, isLoggedIn, userId}}>
      {children}
    </UserContext.Provider>)
}