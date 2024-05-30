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

class StatisticController {

    // GET TOTAL MONEY SPENT HANDLER
    async getTotalMoney(input){
        const {user_id}=input;
        try{
            const transactions = await TransactionModel.find({user:user_id});
            let total = 0;

            for (let transaction in transactions){
              total += transactions[transaction].amount;
            }

            return {
                total_amount: total
            }
        
            
            
        }   catch(error){
            throw (error);
        }
    }


    // GET TOTAL MONEY SPENT TODAY HANDLER
    async getTotalMoneyToday(input){
        const {user_id} = input;

        // generate begining of the day
        const today = new Date();
        today.setHours(0,0,0,0);
        try{
            const transactions = await TransactionModel.find({user:user_id, createdTime:{$gte: today.toISOString()}});
            let total = 0;

            for (let transaction in transactions){
              total += transactions[transaction].amount;
            }

            return {
                total_amount: total
            }
        
            
            
        }   catch(error){
            throw (error);
        }
    }

    // GET TOTAL MONEY SPENT THIS WEEK HANDLER
    async getTotalMoneyThisWeek(input){
        const {user_id} = input;

        // generate beginning of the week
        const today = new Date();
        const day = today.getDay();
        const offset = day === 0 ? 6: day - 1;
        const weekStart = new Date(today.getTime() - offset * 24 * 60 * 60 * 1000);
        const beginOfWeek = weekStart.toISOString().split('T')[0] + 'T00:00:00';

        try{
            const transactions = await TransactionModel.find({user:user_id, createdTime:{$gte:beginOfWeek}});
            let total = 0;

            for (let transaction in transactions){
              total += transactions[transaction].amount;
            }

            return {
                total_amount: total
            }
        
            
            
        }   catch(error){
            throw (error);
        }
    }


    // GET TOTAL MONEY SPENT THIS MONTH HANDLER
    async getTotalMoneyThisMonth(input){
        const {user_id} = input;

        // generate beginning of the week
        const today = new Date();
        today.setDate(1);
        today.setHours(0,0,0,0);
        const beginOfMonth = today.toISOString();

        try{
            const transactions = await TransactionModel.find({user:user_id, createdTime:{$gte:beginOfMonth}});
            let total = 0;

            for (let transaction in transactions){
              total += transactions[transaction].amount;
            }

            return {
                total_amount: total
            }
        
            
            
        }   catch(error){
            throw (error);
        }
    }


    // GET TOTAL MONEY SPENT THIS YEAR HANDLER
    async getTotalMoneyThisYear(input){
        const {user_id} = input;

        // generate beginning of the week
        const today = new Date();
        today.setDate(1);
        today.setMonth(1);
        today.setHours(0,0,0,0);
        const beginOfYear = today.toISOString();

        try{
            const transactions = await TransactionModel.find({user:user_id, createdTime:{$gte:beginOfYear}});
            let total = 0;

            for (let transaction in transactions){
              total += transactions[transaction].amount;
            }

            return {
                total_amount: total
            }
        
            
            
        }   catch(error){
            throw (error);
        }
    }

    async getTotalMoneyByCategory(input){
        const {user_id,category} = input;

        try{
            const transactions = await TransactionModel.find({user:user_id, category:category});
            let total = 0;

            for (let transaction in transactions){
              total += transactions[transaction].amount;
            }

            return {
                total_amount: total
            }
        
            
            
        }   catch(error){
            throw (error);
        }
    }

}

module.exports = new StatisticController();
