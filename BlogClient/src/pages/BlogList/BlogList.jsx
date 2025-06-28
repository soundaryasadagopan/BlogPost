import React, { useContext } from 'react'
import { blogCategories } from '../../assets/assets'
import { useState } from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'
import { StoreContext } from '../../Context/StoreContextProvider'
const BlogList = () => {
    const[menu,setMenu] =useState("All")
    const{blogs,input} =useContext(StoreContext)
  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item,index)=>(
            <div key={index} className='relative'>
                <button className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5' }`} 
                onClick={()=>setMenu(item)}>{item}
                {item== menu &&  (
                    <div className='absolute left-0 top-0 right-0 h-7 -z-1 bg-primary rounded-full'></div>
                )
            }
                </button>
            </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
      gap-8 mb-24 mx-8 sm:mx-16 xl:mx-42'>
        {blogs.filter((blog)=>menu === "All" ?true:blog.category === menu)
        .map((blog)=><BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  )
}

export default BlogList
