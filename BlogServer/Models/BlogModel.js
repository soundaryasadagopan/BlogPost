const mongoose = require("mongoose");

 const blogSchema =  new mongoose.Schema({
    title:{type:String,required:true},
    subTitle:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    isPublished:{type:Boolean,required:true}
 },{timestamps:true})

 const blogModel = mongoose.models.blog || mongoose.model("blog",blogSchema)

 module.exports = blogModel;