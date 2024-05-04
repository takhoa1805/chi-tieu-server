const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transaction = new Schema({
    wallet: {type: Schema.Types.ObjectId,required:true,ref:'Wallet'},
    user: {type: Schema.Types.ObjectId,required:true,ref:'User'},
    amount: {type:Number, required:true},
    title: {type:String,required:true},
    detail:{type:String,required:false},
    createdTime: {type:Date, required:true},
    isExecuted: {type:Boolean, required:true},
    executedTime: {type:Date,required:false},
})

module.exports = mongoose.model('Transaction',Transaction);