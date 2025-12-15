const app=require('./app');
const mongoose=require('mongoose');
require('dotenv').config();
const connectDB=require('./config/db');

//database connection
connectDB();


const port=process.env.PORT || 8001;
const server=app.listen(port,()=>{
    console.log('server is running on port',port);
})

process.on("SIGINT",async()=>{
    await mongoose.connection.close();
    server.close(()=>{
        console.log("server closed");
        process.exit(1);
    });
})
