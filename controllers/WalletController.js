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
                _id:result._id,
                user:result.user,
                name:result.name,
                balance:result.balance,
                detail:result.detail
            }

        }   catch(error){
            throw(error);
        }

    }

    // GET ALL WALLET HANDLER
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

    // GET WALLET BY NAME HANDLER
    async getWalletByName(input){
        const {user_id,name} = input;
        const name_regex = new RegExp(name,'i');
        try{
            const result = await WalletModel.findOne({user:user_id,name:name_regex});
            return {
                wallet: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET WALLET BY ID HANDLER
    async getWalletById(input){
        const {user_id,id} = input;
        try{
            const result = await WalletModel.findOne({user:user_id,_id:id});
            return {
                wallet: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // UPDATE WALLET INFORMATION HANDLER
    async updateWallet(input){
        const {_id,name,balance,detail,user_id} = input;
        try{
            const wallet = await WalletModel.findOne({user:user_id,_id:_id});

            if (!wallet){
                console.log("Wallet not found");
                return {
                    error:{
                        message:'Wallet not found'
                    }
                }
            }

            
            // If user want to change wallet's name, check for name that exists
            if (name && name != wallet.name){
                const existedWalletName = await WalletModel.findOne({user:user_id,name:name});
                if(existedWalletName){
                    console.log("New wallet name is not available");
                    return {
                        error:{
                            message:'New wallet name has existed'
                        }
                    }
                }
            }

            // update fields
            wallet.name = (name) ? name : wallet.name;
            wallet.balance = (balance) ? balance : wallet.balance;
            wallet.detail = (detail) ? detail : wallet.detail;

            // save result
            const result = await wallet.save();


            return {
                message:"Saved changes",
                wallet: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // DELETE WALLET HANDLER
    async deleteWallet(input){
        const {_id,user_id} = input;
        try{
            const wallet = await WalletModel.findOne({user:user_id,_id:_id});
            const user = await UserModel.findOne({_id:user_id});
            

            // verify user
            if (!user){
                console.log("User not found");
                return {
                    error:{
                        message:'User not found'
                    }
                };
            }
            // verify wallet
            if (!wallet){
                console.log("Wallet not found");
                return {
                    error:{
                        message:'Wallet not found'
                    }
                }
            }

            // delete wallet model
            const result = await wallet.deleteOne();
            // update user wallets and savings model
            if (result.acknowledged){
                user.wallets.pop(_id);
                saving.wallet = null;
                await saving.save();
                await user.save();
            }   else {
                return {
                    error:{
                        message:'delete failed',
                        result:result
                    }
                }
            }


            return {
                message:'deleted'
            }


        }   catch(error){
            throw (error);
        }
    }
    
}

module.exports = new WalletController();
