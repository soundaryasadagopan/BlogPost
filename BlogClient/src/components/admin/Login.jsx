import React,{useState,useContext} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContextProvider'
import toast from 'react-hot-toast'


const Login = () => {
    const[data,setData] =useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const {url,token,setToken} =useContext(StoreContext)
    
     const handleChange=(event)=>{
        const name =event.target.name;
        const value = event.target.value;
        setData((data)=>({...data,[name]:value}))
    }
    const handleLogin=async(e)=>{
        try{
        e.preventDefault();
        const response = await axios.post(`${url}/api/admin/login`,data)
     if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
          axios.defaults.headers.common['Authorization'] = response.data.token;
        }else{
            toast.success(response.data.message)
        }
    }catch(error){
        toast.error(error.message)
    }
    } 
    
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'>
                    <span className='text-primary'>Admin</span>Login</h1>
                    <p className='font-light'>Enter the credentials to login</p>
            </div>
       
      <form className='mt-6 w-full sm:max-w-md' onSubmit={handleLogin}>
            <div className="flex flex-col">
                <label>Email</label>
                <input type="email"  name="email"  className="border-b-2 border-gray-300 p-2"onChange={handleChange} value={data.email} placeholder='Enter email' required/><br/>
            </div>
            <div className="flex flex-col">
                <label>password</label>
                <input type="password" name="password"  className="border-b-2 border-gray-300 p-4" onChange = {handleChange}  value={data.password} placeholder='Enter password' required/>
            </div>
            <button className='w-full py-3 mt-3  font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/30
            transistion-all'>Login</button>
                   
        </form>
         </div>
        </div>
    </div>
  )
}

export default Login
