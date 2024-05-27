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

class WalletController {
    // CREATE WALLET HANDLER
    async createWallet(input){
        const {name,balance,detail,user_id} = input;

        try{
            // Check if user already have a wallet with the same name
            const user = await UserModel.findOne({_id:user_id});
            const wallet = await WalletModel.findOne({user:user_id,name:name});
            
            //if there's another wallet of user that has the same name 
            if(wallet){
                console.log("Error: Wallet exists");
                return {
                    error:{
                        message:'Wallet with the same name exists'
                    }
                }
            }

            const result = await WalletModel.create({
                _id: new mongoose.Types.ObjectId(),
                user:user_id,
                name:name,
                balance:balance,
                detail:detail
            })

            user.wallets.push(result._id);
            await user.save();

            return {
                message:'Wallet created successfully',
                user:result.user,
                name:result.name,
                balance:result.balance,
                detail:result.detail
            }

        }   catch(error){
            throw(error);
        }

    }


    async getWallets(input){
        const {user_id} = input;
        try{
            const result = await WalletModel.find({user:user_id});

            return {
                wallets:result
            }

        }   catch(error){
            throw (error);
        }
    }

}

module.exports = new WalletController();
