var express = require('express');
var router = express.Router();
const {authorize_user} = require('../middlewares/authentication_tasks');
const StatisticController = require('../controllers/StatisticController');

/* RETURN ALL MONEY SPENT SINCE USING THIS APP */
router.get('/',authorize_user, async (req, res, next) => {
  const user_id = req.user._id;
  try {
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await StatisticController.getTotalMoney({user_id});

    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log('Error happens: ' + error);
    return res.status(500).json({message:'Error happens'});
  }
});

// GET TOTAL MONEY SPENT TODAY
router.get('/today', authorize_user,async (req, res, next) => {
  const user_id = req.user._id;
  try {
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await StatisticController.getTotalMoneyToday({user_id});

    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log('Error happens: ' + error);
    return res.status(500).json({message:'Error happens'});
  }
});


// GET TOTAL MONEY SPENT THIS WEEK
router.get('/week', authorize_user,async (req, res, next) => {
  const user_id = req.user._id;
  try {
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await StatisticController.getTotalMoneyThisWeek({user_id});

    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log('Error happens: ' + error);
    return res.status(500).json({message:'Error happens'});
  }
});

// GET TOTAL MONEY SPENT THIS MONTH
router.get('/month',authorize_user, async (req, res, next) => {
  const user_id = req.user._id;
  try {
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await StatisticController.getTotalMoneyThisMonth({user_id});

    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log('Error happens: ' + error);
    return res.status(500).json({message:'Error happens'});
  }
});

// GET TOTAL MONEY SPENT THIS YEAR
router.get('/year',authorize_user, async (req, res, next) => {
  const user_id = req.user._id;
  try {
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await StatisticController.getTotalMoneyThisYear({user_id});

    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log('Error happens: ' + error);
    return res.status(500).json({message:'Error happens'});
  }
});


// GET TOTAL MONEY SPENT BY CATEGORY
router.get('/category/:category', authorize_user,async (req, res, next) => {
  const user_id = req.user._id;
  const category = req.params.category;

  try {
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    if (!category){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    }

    const data = await StatisticController.getTotalMoneyByCategory({user_id,category});

    if (!data){
      return res.status(400).json({
        error:{
          message:'Invalid request'
        }
      })
    } else if (data.error){
      console.log(data.error);
      return res.status(400).json(data);
    }

    return res.status(200).json(data);


  } catch(error){
    console.log('Error happens: ' + error);
    return res.status(500).json({message:'Error happens'});
  }
});


module.exports = router;
