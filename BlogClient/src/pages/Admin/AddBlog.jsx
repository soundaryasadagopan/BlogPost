import React, {  useState,useEffect,useRef,useContext } from 'react'
import { assets, blogCategories } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContextProvider';
import toast from 'react-hot-toast';

const AddBlog = () => {
    const[image,setImage] = useState(false);
    const[title,setTitle] = useState("");
    const[subTitle,setSubTitle] = useState("");
    const[category,setCategory] = useState("Startup");
    const[isPublished,setisPublished] = useState(false);
    const[isAdding,setIsAdding] =useState(false)
    const[id,setId] =useState()
     const desc = useRef();
  
    const {axios,url,setEditData,editData} =useContext(StoreContext)
    useEffect(()=>{
      console.log("editData",editData)
  // if(editData && editData._id){
                setId(editData._id) 
                setTitle(editData.title || " ")
                setSubTitle( editData.subTitle || " ")
                setCategory(editData.category || "Startup")
                setisPublished(editData.isPublished || false)
                 desc.current.value= editData.description || " "
                 setImage(editData.image || false);
               
},[editData])
    
    const hanldeSubmit=async(e)=>{
        try{
        e.preventDefault();
        setIsAdding(true);
        const blog = {title,subTitle,description:desc.current.value,
          category,isPublished}
          console.log("blogData",blog)

        const formData = new FormData();
        formData.append("blog",JSON.stringify(blog)); 
        formData.append("image",image);
        console.log("formdata",formData)
        // if(validate()){
         const endpoint = id
        ? `${url}/api/blog/editbyId/${id}`
        : `${url}/api/blog/addblog`;
      const method = id ? axios.put : axios.post;
        const response = await method(endpoint, formData);
         console.log(response,"response")
            if(response.data.success){
                setImage(false);
                setTitle(" ")
                setSubTitle(" ")
                setCategory("Startup")
                setisPublished(false)
                setIsAdding(false)
                desc.current.value= " "

                setEditData({
                   id:" ",
                    title:" ",
                    subTitle:" ",
                   description :" ",
                   caegory:" ",
                   image:" "
                   
                })
                toast.success(response.data.message);
                
                alert(response.data.message)
                navigate("listblog",{ replace: true, state: null })
            }else {
                alert(response.data.message || "blog creation failed") 
            }
        // }  
    }catch(error){
        if (error.response) {
      alert(error.response.data.message || "Server error occurred");
    }
    }
    }
    // useEffect(()=>{
    //   console.log("formdata",formData)
    // },[]) assets.upload_area:URL.createObjectURL(image)
  return (
    <form className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll' onSubmit={hanldeSubmit}>
    <div className='bg-white w-ful max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
      <p>upload thumbnail</p>
      <label htmlFor='image'>
       
        <img src={!image? 
            assets.upload_area
      : typeof image === "string"
      ? image
      : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
        <input type='file' onChange={(e)=>setImage(e.target.files[0])} hidden required={!image} id="image"/>
      </label>

      <p className='mt-4'>Blog Title </p>
        <input type="text" name="title"placeholder='type text here'required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
        onChange={e=>setTitle(e.target.value)} value={title}/>

         <p className='mt-4'>Sub Title </p>
        <input type="text" name="subTitle"placeholder='type text here'required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
        onChange={e=>setSubTitle(e.target.value)} value={subTitle}/>

         <p className='mt-4'>Description </p>
         <textarea   name="description"className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded resize-none h-32'
  placeholder='Write your blog description here...' ref = {desc}>
         </textarea>

         <p className='mt-4'>Category</p>
         <select name="category"onChange={e=>setCategory(e.target.value)} value={category} className='mt-2 px-3 py-2 border text-gray-500
         border-gray-300 outlinie-none rounded'>
            <option value="">Select category</option>
            {blogCategories.map((item,index)=>{
                return <option key={index} value={item}>{item}</option>
            })}
         </select>
         <div className='mt-4'>
            <p>Publish Now</p>
            <input type="checkbox" name="ispublished"
            checked={isPublished} className='scale-125 px-3 py-2
            cursor-pointer'onChange={e=>setisPublished(e.target.checked)} />
         </div>
         <button type="submit" disabled ={isAdding}className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
           {isAdding ? "Adding..." : "Add Blog"}
         </button>

      
    </div>
    </form>
  )
}

 // setEditData({
                // id:"",
                //     title:"",
                //     subTiltle:"",
                //    category :"",
                //    description:"",
                //    ispublished:"",
                //     // role:""
                // })
export default AddBlog
