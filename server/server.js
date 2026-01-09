const app=require('./app');
const mongoose=require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

//database connection
connectDB();

app.use(
  cors({
    origin: "https://expense-tracker-by-hansika.vercel.app" || "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

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


