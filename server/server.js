const app=require('./app');
require('dotenv').config();
const connectDB=require('./config/db');

//database connection
connectDB();


const port=process.env.PORT || 8001;
app.listen(port,()=>{
    console.log('server is running on port',port);
})

process.on("SIGNIT",async()=>{
    await mongoose.connection.close();
    server.close(()=>{
        console.log("server closed");
        process.exit(1);
    });
})
