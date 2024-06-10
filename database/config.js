const mongoose = require("mongoose");
require('dotenv').config();

// const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb+srv://takhoa:takhoa@chi-tieu-database.q7ezyqp.mongodb.net/chi-tieu-database';
// const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/chi-tieu-database';
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://172.18.0.3:27017/chi-tieu-database';



async function connect(){
    try{
        console.log("Trying to establish connection to database: " + CONNECTION_STRING);
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connect successfully to database");

    }   catch(error){
        console.log("Connect failed: " + error);
    }
}

module.exports = connect;