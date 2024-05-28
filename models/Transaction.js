const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transaction = new Schema({
    wallet: {type: Schema.Types.ObjectId,required:false,ref:'Wallet'},
    user: {type: Schema.Types.ObjectId,required:true,ref:'User'},
    amount: {type:Number, required:true},
    title: {type:String,required:true},
    category: {type:String,required:false, default:'Other'},
    detail:{type:String,required:false, default: 'None'},
    createdTime: {type:Date, required:true},
})

module.exports = mongoose.model('Transaction',Transaction);