import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContextProvider';
const NavBar = () => {
  const navigate = useNavigate();
     const {token} =useContext(StoreContext)
 
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img src={assets.logo} onClick={()=> navigate("/")} alt="logo" className='w:32 sm:w-44 cursor-pointer'/>
     
        <div className='navbar-right'>  
        
           <button onClick={()=> navigate("/admin")} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
            {token ? "Dashboard": "login"}</button>
      
          
            </div>
    </div>
    
  )
}

export default NavBar
