const {hash_password,
        verify_password,
        generate_signature,
        verify_signature,
        authorize_user} = require('../middlewares/authentication_tasks');

const mongoose = require('mongoose');
const SavingModel = require('../models/Saving');
const StatisticModel = require('../models/Statistic');
const TransactionModel = require('../models/Transaction');
const UserModel = require('../models/User');
const WalletModel = require('../models/Wallet');

class UserController {
    // SIGN UP TASK HANDLER
    async signup(input){
        const {email,password,name,phone_number} = input;

        // Check if user email has existed
        const existUser = await UserModel.findOne({email:email});
        if (existUser){
            return null;
        }   else{
            try{
                // Hash password before storing to database
                const hashed_password = await hash_password(password);
                const NewUser = new UserModel({
                    _id: new mongoose.Types.ObjectId(),
                    email:email,
                    password: hashed_password,
                    name: name,
                    phone_number:phone_number
                });

                const result = await NewUser.save();

                return {
                    messge:'Account created successfully',
                    email: result.email,
                    name: result.name,
                    phone_number: result.phone_number,
                }

            }   catch(error){
                throw error;
            }
        }
    }

    // SIGN IN TASK HANDLER
    async signin(input){
        const {email,password} = input;

        try{
            // Check if user has existed
            const existUser = await UserModel.findOne({email:email});
            if(existUser){
                // check if password is valid
                const validPassword = await verify_password(password,existUser.password);
                if(validPassword){
                    const token = await generate_signature({
                        email:existUser.email,
                        _id : existUser._id
                    })
                    
                    return {
                        message:'Login successfully',
                        email:existUser.email,
                        name:existUser.name,
                        token:token
                    }

                }
            }  

            return {
                error:{
                    message:'Login failed'
                }
            }


        }   catch (error){
            throw error;
        }
    }
}

module.exports = new UserController();
