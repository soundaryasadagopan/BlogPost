import React,{useContext,useEffect} from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContextProvider'

const Dashborad = () => {
           const {blogs,fetchblog} =useContext(StoreContext);

           useEffect(()=>{
                   fetchblog()
                 },[])
   
  return (
    <div className='flex-1 p-4 md:p-10 bg-vlue-50/50'>
      <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
        <img src={assets.dashboard_icon_4} alt=""/>
      </div>
      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
            <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
                <th scope ="col" className='px-2 py-4 xl:px-6'>#</th>
               <th scope ="col" className='px-2 py-4'>Blog image</th>
              <th scope ="col" className='px-2 py-4'>Blog title</th>
                <th scope ="col" className='px-2 py-4 max-sm:hidden'>Blog category</th>
                <th scope ="col" className='px-2 py-4 max-sm:hidden'>Date</th>
            </tr>
            </thead>
            <tbody>
                {blogs.map((blog,index)=>(   
                <tr key={index}>
                    <th className='px-2 py-4'>{index+1}</th>
                    <td className='px-2 py-4'><img src={blog.image}className="w-24 h-auto object-cover rounded" alt=""/></td>

                    <td className='px-2 py-4'>{blog.title}</td>
                    <td className='px-2 py-4 max-sm:hidden'>{blog.category}</td>
                    <td className='px-2 py-4 max-sm:hidden'>{new Date(blog.createdAt).toDateString()}</td>

                </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashborad
