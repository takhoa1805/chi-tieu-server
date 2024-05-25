const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUND = 10;

module.exports.hash_password = async (plain_password) =>{
    return await bcrypt.hash(plain_password,SALT_ROUND);
}

module.exports.verify_password = async (plain_password,hashed_password) =>{
    return await bcrypt.compare(plain_password,hashed_password);
}
