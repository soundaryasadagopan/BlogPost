import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContextProvider';
import { useNavigate } from 'react-router-dom';

const ListBlog = () => {
    const {blogs,axios,url,setEditData,fetchblog} =useContext(StoreContext)
    const navigate = useNavigate();

     useEffect(()=>{
        fetchblog()
      },[])

    const handleDelete = async(id)=>{
    const response = await axios.post(`${url}/api/blog/removeblog/${id}`);
        if(response.data.success){
                alert("Data deleted successfully")       
    }else{
        alert("Data is not deleted")
    }
    }
const handleEdit = async(id)=>{
   const response = await axios.get(`${url}/api/blog/fetchbyId/${id}`);
   console.log("response",response)
        if(response.data.success){ 
          setEditData(response.data.blog) ;
          navigate("/admin/addblog") ;      
    }else{
        alert("Data is not modified")
    } 
}
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
        <h1>All blogs</h1>
        <div className='relative max-w-4xl h-4/5 mt-4 overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className="text-xs text-gray-600 text-left uppercase">
                    <tr>
                        <th scope ="col" className='px-2 py-4 xl:px-6'>#</th>
                        <th scope ="col" className='px-2 py-4'>Blog image</th>
                        
                        <th scope ="col" className='px-2 py-4'>Blog title</th>
                        <th scope ="col" className='px-2 py-4 max-sm:hidden'>Blog category</th>
                        {/* <th scope ="col" className='px-2 py-4 max-sm:hidden'>Edit</th> */}
                        <th scope ="col" className='px-2 py-4 '>Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog,index)=>(   
                        <tr key={index}>
                            <th className='px-2 py-4'>{index+1}</th>
                            <td className='px-2 py-4'><img src={blog.image}className="w-24 h-auto object-cover rounded" alt=""/></td>
                            <td className='px-2 py-4'>{blog.title}</td>
                            <td className='px-2 py-4 max-sm:hidden'>{blog.category}</td>
                            <td className='px-2 py-4 flex text-xs gap-3'>
                                <button className='cursor-pointer border rounded px-2 py-0.5 mt-1'onClick={()=>handleEdit(blog._id)}>Edit</button>
                                
                                <img src={assets.cross_icon} alt="" className='w-8 hover-scale-110 transition-all cursor-pointer' 
                                onClick={()=>handleDelete(blog._id)}/>

                            </td>
        
                        </tr>
                        ))}
                    </tbody>
                </table>
              </div>
      
    </div>
  )
}

export default ListBlog
