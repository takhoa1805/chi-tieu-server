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

class TransactionController {
    // CREATE TRANSACTION HANDLER
    async createTransaction(input){
        const {wallet,user_id,amount,title,category,detail,createdTime} = input;

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
    
            const result = await TransactionModel.create({
                _id: new mongoose.Types.ObjectId(),
                wallet:wallet,
                user:user_id,
                amount:amount,
                title:title,
                category:category,
                detail:detail,
                createdTime: createdTime ? createdTime : Date.now()
            })

            if (result){
                user.transactions.push(result._id);
                await user.save();
            }

            return {
                message:'Transaction created successfully',
                _id: result._id,
                wallet:result.wallet,
                user:result.user,
                amount:result.amount,
                title:result.title,
                category:result.category,
                detail:result.detail,
                createdTime:result.createdTime
            }

        }   catch(error){
            throw(error);
        }

    }

    // GET ALL TRANSACTIONS HANDLER
    async getTransactions(input){
        const {user_id} = input;
        try{
            const result = await TransactionModel.find({user:user_id});

            return {
                transactions:result
            }

        }   catch(error){
            throw (error);
        }
    }

    // GET TRANSACTION BY ITS TITLE HANDLER
    async getTransactionByTitle(input){
        const {user_id,title} = input;
        const title_regex = new RegExp(title,'i');
        try{
            const result = await TransactionModel.find({user:user_id,title:title_regex});
            return {
                transactions: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET TRANSACTION BY ITS TITLE HANDLER
    async getTransactionByCategory(input){
        const {user_id,category} = input;
        const category_regex = new RegExp(category,'i');
        try{
            const result = await TransactionModel.find({user:user_id,category:category_regex});
            return {
                transactions: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET TRANSACTION BY ID HANDLER
    async getTransactionById(input){
        const {user_id,id} = input;
        try{
            const result = await TransactionModel.findOne({user:user_id,_id:id});
            return {
                transaction: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET TRANSACTIONS TODAY
    async getTransactionsToday(input){
        const {user_id} = input;

        // generate beginning of the day
        const today = new Date();
        today.setHours(0,0,0,0);

        try{
            const result = await TransactionModel.find({user:user_id, createdTime: {$gte: today.toISOString()}});
            return {
                transactions: result
            }
        }   catch(error){
            throw (error);
        }
    }


    // GET TRANSACTIONS THIS WEEK
    async getTransactionsThisWeek(input){
        const {user_id} = input;

        // generate beginning of the week
        const today = new Date();
        const day = today.getDay();
        const offset = day === 0 ? 6: day - 1;
        const weekStart = new Date(today.getTime() - offset * 24 * 60 * 60 * 1000);
        const beginOfWeek = weekStart.toISOString().split('T')[0] + 'T00:00:00';

        try{
            const result = await TransactionModel.find({user:user_id, createdTime: {$gte: beginOfWeek}});
            return {
                transactions: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET TRANSACTIONS THIS MONTH
    async getTransactionsThisMonth(input){
        const {user_id} = input;

        // generate beginning of the week
        const today = new Date();
        today.setDate(1);
        today.setHours(0,0,0,0);
        const beginOfMonth = today.toISOString();

        try{
            const result = await TransactionModel.find({user:user_id, createdTime: {$gte: beginOfMonth}});
            return {
                transactions: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // GET TRANSACTIONS THIS YEAR
    async getTransactionsThisYear(input){
        const {user_id} = input;

        // generate beginning of the week
        const today = new Date();
        today.setDate(1);
        today.setMonth(1);
        today.setHours(0,0,0,0);
        const beginOfYear = today.toISOString();

        try{
            const result = await TransactionModel.find({user:user_id, createdTime: {$gte: beginOfYear}});
            return {
                transactions: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // UPDATE WALLET INFORMATION HANDLER
    async updateTransaction(input){
        const {_id,wallet,user_id,amount,title,category,detail} = input;
        try{
            const transaction = await TransactionModel.findOne({user:user_id,_id:_id});

            if (!transaction){
                console.log("Transaction not found");
                return {
                    error:{
                        message:'Transaction not found'
                    }
                }
            }

            // update fields
            transaction.wallet = wallet ? wallet : transaction.wallet;
            transaction.amount = amount ? amount : transaction.amount;
            transaction.title = title ? title : transaction.title;
            transaction.category = category ? category : transaction.category;
            transaction.detail = detail ? detail : transaction.detail;


            // save result
            const result = await transaction.save();


            return {
                message:"Saved changes",
                transaction: result
            }
        }   catch(error){
            throw (error);
        }
    }

    // DELETE TRANSACTION HANDLER
    async deleteTransaction(input){
        const {_id,user_id} = input;
        try{
            const transaction = await TransactionModel.findOne({user:user_id,_id:_id});
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
            if (!transaction){
                console.log("Transaction not found");
                return {
                    error:{
                        message:'Transaction not found'
                    }
                }
            }

            // delete wallet model
            const result = await transaction.deleteOne();
            // update user wallets model
            if (result.acknowledged){
                user.transactions.pop(_id);
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

module.exports = new TransactionController();
