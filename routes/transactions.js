var express = require('express');
var router = express.Router();
const { authorize_user } = require('../middlewares/authentication_tasks');
const TransactionController = require('../controllers/TransactionController');

// GET ALL TRANSACTIONS OF USER
router.get('/', authorize_user,async (req, res, next)=> {
  const user_id = req.user._id;

  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await TransactionController.getTransactions({user_id});
    
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


// GET TRANSACTION BY ID
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

    const data = await TransactionController.getTransactionById({user_id,id});
    
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

// GET TRANSACTION BY TITLE
router.get('/find_title/:title',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  const title = req.params.title;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    if (!title){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      });
    }

    const data = await TransactionController.getTransactionByTitle({user_id,title});
    
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

// GET TRANSACTION BY CATEGORY
router.get('/find_category/:category',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  const category = req.params.category;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    if (!category){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      });
    }

    const data = await TransactionController.getTransactionByCategory({user_id,category});
    
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

// GET TRANSACTION TODAY
router.get('/find_today',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await TransactionController.getTransactionsToday({user_id});
    
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

// GET TRANSACTION THIS WEEK
router.get('/find_week',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await TransactionController.getTransactionsThisWeek({user_id});
    
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

// GET TRANSACTION THIS MONTH
router.get('/find_month',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await TransactionController.getTransactionsThisMonth({user_id});
    
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

// GET TRANSACTION THIS YEAR
router.get('/find_year',authorize_user,async (req,res,next) =>{
  const user_id = req.user._id;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }
    
    const data = await TransactionController.getTransactionsThisYear({user_id});
    
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

// CREATE TRANSACTION
router.post('/create',authorize_user,async(req,res,next)=>{
  const user_id = req.user._id;
  var {wallet,amount,title,category,detail} = req.body;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    // Make sure wallet name cannot be empty
    if (typeof(wallet) === 'undefined' ||
        typeof(title) === 'undefined' ||
        typeof(amount) === 'undefined'
        ){
      return res.status(400).json({
        error:{
          message: 'Wallet field, Amount field and Title field cannot be empty'
        }
      });
    }

    // initial value for amount + saved_amount + category + detail + is_completed
    if (!category){
      category = 'Other';
    }
    if (!detail){
      detail = 'None';
    }

    const data = await TransactionController.createTransaction({wallet,user_id,amount,title,category,detail});
    
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

// UPDATE TRANSACTION
router.post('/update',authorize_user,async(req,res,next)=>{
  const user_id = req.user._id;
  var {_id,wallet,amount,title,category,detail} = req.body;

  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await TransactionController.updateTransaction({_id,user_id,wallet,amount,title,category,detail});
    
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

// DELETE TRANSACTION
router.post('/delete',authorize_user,async(req,res,next)=>{
  const user_id = req.user._id;
  var {_id} = req.body;
  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await TransactionController.deleteTransaction({_id,user_id});
    
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
