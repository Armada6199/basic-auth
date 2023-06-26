const express = require('express');
const router=express.Router();
const loginMiddleware=require('../middleware/login');
const usersModel=require('./models/user-model')
router.post('/signup',async(req,res,next)=>{
    console.log('on')
  try {
    const record = await usersModel.create(req.body);
    res.status(200).json(record);
  } catch (error) {
    console.log(error)
     res.status(403).send(error);
     }
});
router.post('/signin',loginMiddleware,async(req,res)=>{
res.status(200).send('login successfull')
});
module.exports=router