const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    urlCode:{
        type:String,
        required:true,
        unique:true
    }
    ,
    clicks:{
        type:Number,
        default:0
    }
},{timestamps});

module.exports=mongoose.model('Url',urlSchema);