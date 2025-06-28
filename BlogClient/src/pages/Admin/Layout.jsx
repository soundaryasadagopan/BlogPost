import React,{useContext} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import SideBar from '../../components/admin/SideBar'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContextProvider'

const Layout = () => {
    const navigate = useNavigate()
    const{setToken} =useContext(StoreContext)
    const logout =()=>{
      localStorage.removeItem("token")
      axios.defaults.headers.common['Authorization'] = null;
      setToken(null)
        navigate("/")
    }
  return (
    <>
    <div className='flex items-center justify-between py-2 px-4 h-[70px] sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} onClick={()=> navigate("/")} alt="logo" className='w:32 sm:w-44 cursor-pointer'/>        
        <button onClick={logout} className='text-white px-8 py-2 text-sm cursor-pointer bg-primary text-white rounded-full'>logout</button>
                   
    </div>
        <div className='flex h-[calc(100vh-70px)]'>
        <SideBar/>
        <Outlet/>
        </div>
    </>
  )
}

export default Layout
