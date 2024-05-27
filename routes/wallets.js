var express = require('express');
var router = express.Router();
const {authorize_user} = require('../middlewares/authentication_tasks');
const WalletController = require('../controllers/WalletController');

/* GET ALL WALLETS OF USER*/
router.get('/', authorize_user,async (req, res, next)  => {
  const user_id = req.user._id;

  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await WalletController.getWallets({user_id});
    
    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      });
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log("Error happens: " + error);
    return res.status(500).json({message:'Error happens'});
  }

});

// CREATE NEW WALLET
router.post('/create',authorize_user,async(req,res,next) =>{
  const user_id = req.user._id;
  var {name,balance,detail} = req.body;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    // Make sure wallet name cannot be empty
    if (typeof(name) === 'undefined'){
      return res.status(400).json({
        error:{
          message: 'Wallet name cannot be empty'
        }
      });
    }

    // initial value for balance and detail just in case user dont enter
    if (!balance){
      balance = 0;
    }
    if (!detail){
      detail = 'None';
    }


    const data = await WalletController.createWallet({name,balance,detail,user_id});
    
    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      });
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log("Error happens: " + error);
    return res.status(500).json({message:'Error happens'});
  }

})

module.exports = router;
