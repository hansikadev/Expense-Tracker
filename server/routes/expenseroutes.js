const express=require('express');

const expensecontroller=require('../controllers/expensecontroller');

const router=express.Router();

router
    .get('/',expensecontroller.getallexpenses)
    .post("/",expensecontroller.createexpense);

router
    .put('/:id',expensecontroller.updateexpense)
    .delete('/:id',expensecontroller.deleteexpense);

module.exports=router; 