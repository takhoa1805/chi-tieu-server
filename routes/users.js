const express = require('express');
const router = express.Router();
const {authorize_user} = require('../middlewares/authentication_tasks');
const UserController = require('../controllers/UserController');


/* GET USER INFORMATION */
router.get('/',authorize_user, async (req, res, next) => {
  const user_id = req.user._id;

  try{
    if (!user_id){
      console.log("Error: Cannot find user id");
      return res.status(404).json({message:'User not found'});
    }

    const data = await UserController.getInfo({user_id});
    
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

// SIGN UP REQUEST
router.post('/signup',async(req,res,next)=>{
  try{

    const {email,password,name,phone_number} = req.body;

    // check if request data is valid
    if (typeof(email) === 'undefined'||
        typeof(password) ==='undefined'||
        typeof(name) === 'undefined'
    ){
      // One or more required fields are missing
      return res.status(400).json({
        error:{
          message: 'Invalid data'
        }
      });
    } 

    // send request to controller
    const data = await UserController.signup({email,password,name,phone_number});
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

// SIGN IN REQUEST
router.post('/signin',async(req,res,next) =>{
  try{
    const {email,password} = req.body;
    
    // send request to controller
    const data = await UserController.signin({email,password});
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
    return res.status(500).json({message: 'Error happens'});
  }
})



module.exports = router;
