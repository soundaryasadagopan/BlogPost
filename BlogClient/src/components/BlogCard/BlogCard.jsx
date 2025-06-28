import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog}) => {
    const navigate = useNavigate();
    const{title,description,image,category,_id} = blog
  return (
    <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25
    duration-300 cursor-pointer'>
        <img src={image} alt="" className='aspect-video'/>
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='p-5'>
            <h4 className='mb-2 text-gray-900 font-medium'>{title}</h4>
            <p className='mb-3 text-xs test-gray-300' dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}></p>
        </div>
      
    </div>
  )
}

export default BlogCard
