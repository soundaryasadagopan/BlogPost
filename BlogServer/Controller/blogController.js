const imagekit = require("../Config/imageKit");
const blogModel = require("../Models/BlogModel");
const fs = require("fs");

const addBlog =async(req,res)=>{
    try{
        const{title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        if(!title ||!description || !category || !imageFile){
            return res.json({success:false,message:"Missing field required"})
        }
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs" 
        })
        console.log("response",response)
        const imageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality:'auto'},
                {format:"webp"},
                {width:'1280'}]
        })

        const image = imageUrl;
        console.log(imageUrl,"imageurl")
        await blogModel.create({title,subTitle,description,category,image,isPublished})
        res.json({success:true,message:"blog created successfully"})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
const getAllBlog =async(req,res)=>{
    try{
        const blogs = await blogModel.find({isPublished:true});
        if(!blogs){
            return res.json({success:false,message:"blogs not found"})
        }
        res.json({success:true,blogs});
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

const getBlogById =async(req,res)=>{
    try{
        const {id:blogId} =req.params;
        const blog = await blogModel.findById(blogId);
        console.log("blogid",req.params._id)
        if(!blog){
            return res.json({success:false,message:"blog not found"})
        }
        res.json({success:true,blog});
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

const editBlog = async (req, res) => {
    try {
        const {id:blogId} = req.params;
        console.log("blogbody",req.body.blog)
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        blog.title = title || blog.title;
        blog.subTitle = subTitle || blog.subTitle;
        blog.description = description || blog.description;
        blog.category = category || blog.category;
        blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/blogs"
            });

            const imageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: "auto" },
                    { format: "webp" },
                    { width: "1280" }
                ]
            });

            blog.image = imageUrl;
        }

        await blog.save();
        res.json({ success: true, message: "Blog updated successfully", blog });

    } catch (error) {
        console.error("Edit Blog Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteBlogById =async(req,res)=>{
    try{
        const {id:blogId} =req.params;
        const blog = await blogModel.findById(blogId);
        if(!blog){
            return res.json({success:false,message:"blog not found"})
        }
        await blogModel.findByIdAndDelete(blogId)
        res.json({success:true,blog,message:"blog deleted successfully"});
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

module.exports = {addBlog,getAllBlog,getBlogById,deleteBlogById,editBlog}