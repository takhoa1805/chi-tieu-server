var express = require('express');
var router = express.Router();
const {authorize_user} = require('../middlewares/authentication_tasks');
const SavingController = require('../controllers/SavingController');

/* GET ALL SAVING OF USER*/
router.get('/', authorize_user,async (req, res, next)  => {
  const user_id = req.user._id;

  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await SavingController.getSavings({user_id});
    
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

// GET SAVING WITH NAME
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

    const data = await SavingController.getSavingByName({user_id,name});
    
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


// GET SAVING WITH ID
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

    const data = await SavingController.getSavingById({user_id,id});
    
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

// CREATE NEW SAVING
router.post('/create',authorize_user,async(req,res,next) =>{
  const user_id = req.user._id;
  var {wallet,amount,saved_amount,title,category,detail,is_completed} = req.body;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    // Make sure wallet name cannot be empty
    if (typeof(wallet) === 'undefined' ||
        typeof(title) === 'undefined'
        ){
      return res.status(400).json({
        error:{
          message: 'Wallet field and Saving title field cannot be empty'
        }
      });
    }

    // initial value for amount + saved_amount + category + detail + is_completed
    if (!amount){
      amount = 0;
    }
    if (!saved_amount){
      saved_amount = 0;
    }
    if (!category){
      category = 'Other';
    }
    if (!detail){
      detail = 'None';
    }
    if (!is_completed){
      is_completed = 'false';
    }

    const data = await SavingController.createSaving({wallet,user_id,amount,saved_amount,title,category,detail,is_completed});
    
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

// UPDATE SAVING INFORMATION
router.post('/update/',authorize_user,async(req,res,next) =>{
  const user_id = req.user._id;
  var {_id,wallet,amount,saved_amount,title,category,detail,is_completed} = req.body;

  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await SavingController.updateSaving({_id,wallet,user_id,amount,saved_amount,title,category,detail,is_completed});
    
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

    const data = await SavingController.deleteSaving({_id,user_id});
    
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
