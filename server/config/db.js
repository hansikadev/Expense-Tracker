const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
       const conn=await mongoose.connect(process.env.MONGODB_URI.replace('<PASSWORD>',process.env.DATABASEPASSWORD))
       console.log("MongoDB connected:");
    }
    catch(error){
        console.error('Database connection error:',error.message);
        process.exit(1);
    }
}

module.exports=connectDB;