const mongoose=require('mongoose');
const expenseSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    amount:{
        type:Number,
        required:true,
        min:0.01,
    },
    category:{
        type:String,
        enum:['Food','Transport','Entertainment','shopping','Bills','Healthcare','Other'],
    },
    date:{
        type:Date,
        default:Date.now
    },
    notes:{
        type:String,
        trim:true,
        maxlength:500    
    },
},
    { timestamps:true}
);
expenseSchema.pre('save',function(next){
    if(this.amount) this.amout=Math.round(this.amount*100)/100;
    next();
});

const Expense=mongoose.model('CopyExpense',expenseSchema);
module.exports=Expense;