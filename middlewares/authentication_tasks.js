const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUND = 10;
const KEY = 'CHI-TIEU';

module.exports.hash_password = async (plain_password) =>{
    return await bcrypt.hash(plain_password,SALT_ROUND);
}

module.exports.verify_password = async (plain_password,hashed_password) =>{
    return await bcrypt.compare(plain_password,hashed_password);
}

module.exports.generate_signature = async(payload) =>{
    try{
        return jwt.sign(payload,KEY,{expiresIn: '7d'});
    }   catch (error){
        console.log("Error happens: " + error);
        return error;
    }
}

module.exports.verify_signature = async (req) =>{
    try{
        const signature = req.get("Authorization");
        const payload = jwt.verify(signature.split(' ')[1],KEY);
        req.user = payload;
        return true;

    }   catch (error){
        console.log("Error happens: " + error);
        return false;
    }
}

module.exports.authorize_user = async (req,res,next) => {
    const is_authorized = await this.verify_signature(req);
    if (is_authorized){
        return next();
    }
    return res.status(403).json({message:'Not authorized'});
}