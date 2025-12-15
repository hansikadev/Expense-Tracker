const express=require('express');
const expenseroutes=require('./routes/expenseroutes');
const cors=require('cors');

const app=express();

//middlewares
app.use(express.json());
app.use(cors());


//api routes
app.use('/api/v2/expense',expenseroutes)

module.exports=app;

