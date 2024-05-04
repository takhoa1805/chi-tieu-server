const mongoose = require("mongoose");
require('dotenv').config();

async function connect(){
    try{
        console.log("Trying to establish connection to database: " + process.env.CONNECTION_STRING)
        await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log("Connect successfully to database");

    }   catch(error){
        console.log("Connect failed: " + error);
    }
}

module.exports = connect;