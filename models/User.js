const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    email:{type:String, required: true},
    password:{type:String,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    age:{type:Number,required:false},
    phone_number:{type:String,required:false},
    wallets: [{type: Schema.Types.ObjectId,required:false,ref:'Wallet'}],
    salt:String,
})

module.exports = mongoose.model('User',User);