import React, { useEffect, useState,useContext} from 'react'
import { assets} from '../../assets/assets'
import NavBar from '../../components/NavBar/NavBar'
import Moment from "moment"
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { StoreContext } from '../../Context/StoreContextProvider'

const Blog = () => {
    const {id} = useParams()
    const[data,setData] =useState({})
        const {axios,url} =useContext(StoreContext)
    
    const fetchBlogData =async()=>{
        try{
            const response = await axios.get(`${url}/api/blog/fetchbyId/${id}`)
            response.data.success ? setData(response.data.blog):toast.error(response.data.message)
        }catch(error){
            toast.error(error.message)
        }
       
    }
    useEffect(()=>{
        fetchBlogData()
        console.log("data",data)
    },[])
  return data? (
    <div className='relative'>
        <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50'></img>
        
        <NavBar/>
        <div className='text-center mt-20 text-gray-600'>
            <p className='text-primary py-4 font-medium'>published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
            <h1 className='tets-2xl sm:text-5xl font-seminold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
            <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTilte}</h2>
            <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35
            bg-primary/5 font-medium text-primary'>Soundarya sadagopan</p>
        </div>

        <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
            <img src={data.image} alt="" className='rounded-3xl mb-5'/>
            <div  className="rich-text max-w-3xl mx-auto"dangerouslySetInnerHTML={{__html:data.description}}></div>
        </div>
      
    </div>
  ):<div>Loading...</div>
}

export default Blog
 