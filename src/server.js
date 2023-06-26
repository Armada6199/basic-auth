'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const authRouter=require('./auth/router');
const usersModel=require('./auth/models/user-model');
const notFoundMiddleware=require('./middleware/404')
// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());


// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.get('/',async(req,res)=>{
 const allUsers=await usersModel.findAll();
  res.send(allUsers)
})
app.use('/',authRouter)
app.use('*',notFoundMiddleware)
function startServer(PORT){
  app.listen(PORT, () => console.log('server up on PORT  '+PORT));
};
module.exports={app,startServer};
