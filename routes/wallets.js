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

// GET WALLET WITH NAME
router.get('/find/:name',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  const name = req.params.name;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    if (!name){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      });
    }

    const data = await WalletController.getWalletByName({user_id,name});
    
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


// GET WALLET WITH ID
router.get('/find_id/:id',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  const id = req.params.id;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    if (!id){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      });
    }

    const data = await WalletController.getWalletById({user_id,id});
    
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

    if (name){
      name = name.replace(/\s*$/,'');
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

});

// UPDATE NEW WALLET
router.post('/update/',authorize_user,async(req,res,next) =>{
  const user_id = req.user._id;
  var {_id,name,balance,detail} = req.body;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    if (name){
      name = name.replace(/\s*$/,'');
    }
    const data = await WalletController.updateWallet({_id,name,balance,detail,user_id});
    
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


// DELETE WALLET
router.post('/delete/',authorize_user,async(req,res,next) =>{
  const user_id = req.user._id;
  var {_id} = req.body;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await WalletController.deleteWallet({_id,user_id});
    
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





module.exports = router;
