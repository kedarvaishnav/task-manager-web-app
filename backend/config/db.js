const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/taskforge");//database name taskforge
        console.log("MongoDB connected");
    }
    catch(err){
        console.error("MongoDB connection failed");
        process.exit(1);
    }
};

module.exports=connectDB;