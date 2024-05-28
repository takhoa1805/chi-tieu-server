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

class SavingController {
    // CREATE WALLET HANDLER
    async createSaving(input){
        const {wallet,user_id,amount,saved_amount,title,category,detail,is_completed} = input;

        try{
            // Get user model to update its information
            const user = await UserModel.findOne({_id:user_id});
            // Get wallet model to check if user actually has this wallet
            const existedWallet = await WalletModel.findOne({_id:wallet, user:user_id});

            if (!existedWallet){
                console.log("Wallet not found");
                return {
                    error:{
                        message:'User does not have this wallet'
                    }
                }
            }
    
            const result = await SavingModel.create({
                _id: new mongoose.Types.ObjectId(),
                wallet:wallet,
                user:user_id,
                amount:amount,
                saved_amount:saved_amount,
                title:title,
                category:category,
                detail:detail,
                is_completed:is_completed
            })

            if (result){
                user.savings.push(result._id);
                await user.save();
            }

            return {
                message:'Saving created successfully',
                _id: result._id,
                wallet:result.wallet,
                user:result.user,
                amount:result.amount,
                saved_amount:result.saved_amount,
                title:result.title,
                category:result.category,
                detail:result.detail,
                is_completed:result.is_completed
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
        try{
            const result = await WalletModel.findOne({user:user_id,name:name});
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
            // update user wallets model
            if (result.acknowledged){
                user.wallets.pop(_id);
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

module.exports = new SavingController();
