const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Wallet = new Schema({
    user: {type: Schema.Types.ObjectId,required:true,ref:'User'},
    name: {type:String, required:true},
    balance: {type:Number, required:true},
    detail:{type:String,required:false},
})

module.exports = mongoose.model('Wallet',Wallet);