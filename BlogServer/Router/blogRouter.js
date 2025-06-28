const express = require("express");
const {addBlog,getAllBlog,getBlogById, deleteBlogById, editBlog} = require("../Controller/blogController");
const auth = require("../middlware/auth");
const upload = require("../middlware/multer");


const blogRouter = express.Router();

blogRouter.post("/addblog",upload.single("image"),auth,addBlog);

blogRouter.get("/fetchAllblog",getAllBlog);

blogRouter.get("/fetchbyId/:id",getBlogById);
blogRouter.put("/editbyId/:id",upload.single("image"),auth,editBlog);


blogRouter.post("/removeblog/:id",auth,deleteBlogById);




module.exports = blogRouter;