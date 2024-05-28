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

    // GET ALL SAVINGS HANDLER
    async getSavings(input){
        const {user_id} = input;
        try{
            const result = await SavingModel.find({user:user_id});

            return {
                savings:result
            }

        }   catch(error){
            throw (error);
        }
    }

    // GET SAVING BY ITS TITLE HANDLER
    async getSavingByTitle(input){
        const {user_id,title} = input;
        try{
            const result = await SavingModel.find({user:user_id,title:title});
            return {
                saving: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET SAVING BY ID HANDLER
    async getSavingById(input){
        const {user_id,id} = input;
        try{
            const result = await SavingModel.findOne({user:user_id,_id:id});
            return {
                saving: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // UPDATE WALLET INFORMATION HANDLER
    async updateSaving(input){
        const {_id,wallet,user_id,amount,saved_amount,title,category,detail,is_completed} = input;
        try{
            const saving = await SavingModel.findOne({user:user_id,_id:_id});

            if (!saving){
                console.log("Saving not found");
                return {
                    error:{
                        message:'Saving not found'
                    }
                }
            }

            // update fields
            saving.wallet = wallet ? wallet : saving.wallet;
            saving.amount = amount ? amount : saving.amount;
            saving.saved_amount = saved_amount ? saved_amount : saving.saved_amount;
            saving.title = title ? title : saving.title;
            saving.category = category ? category : saving.category;
            saving.detail = detail ? detail : saving.detail;
            saving.is_completed = is_completed ? is_completed : saving.is_completed;


            // save result
            const result = await saving.save();


            return {
                message:"Saved changes",
                saving: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // DELETE SAVING HANDLER
    async deleteSaving(input){
        const {_id,user_id} = input;
        try{
            const saving = await SavingModel.findOne({user:user_id,_id:_id});
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
            if (!saving){
                console.log("Saving not found");
                return {
                    error:{
                        message:'Saving not found'
                    }
                }
            }

            // delete wallet model
            const result = await saving.deleteOne();
            // update user wallets model
            if (result.acknowledged){
                user.savings.pop(_id);
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
