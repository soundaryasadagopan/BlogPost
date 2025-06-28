import React,{useEffect, useState} from 'react'
import { createContext } from 'react';
import toast from 'react-hot-toast';
import axios from "axios"

export const StoreContext = createContext(); 
const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const[token,setToken] = useState(null)
    const[blogs,setBlogs]=useState([])
    const[input,setInput] =useState("")
    const[editData,setEditData] = useState({})

    const fetchblog = async()=>{
      try{
            const {data}= await axios.get(`${url}/api/blog/fetchAllblog`)
            data.success ? setBlogs(data.blogs):toast.error(data.message)
        }catch(error){
          toast.error(error.message)
        }   
      }
      useEffect(()=>{
        fetchblog()
        const token = localStorage.getItem("token")
        if(token){
          setToken(token)
          axios.defaults.headers.common['Authorization'] = `${token}`;
        }
      },[])
      useEffect(()=>{
        console.log("blogs",blogs)
      },[blogs])
  const contextValue= {url,token,setToken,input,setInput,axios,blogs,editData,setEditData,fetchblog}
  return (
      <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
  )
}

export default StoreContextProvider
