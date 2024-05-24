const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Saving = new Schema({
    wallet: {type: Schema.Types.ObjectId,required:true,ref:'Wallet'},
    user: {type: Schema.Types.ObjectId,required:true,ref:'User'},
    amount: {type:Number, required:true},
    saved_amount:{type:Number, required:true},
    title: {type:String,required:true},
    category: {type:String,required:false, default:'Other'},
    detail:{type:String,required:false, default: 'None'},
    is_completed:{type:Boolean,required:true, default:false}
})

module.exports = mongoose.model('Saving',Saving);