const usersModel=require('../auth/models/user-model');
const base64 = require('base-64');

module.exports=async(req,res,next)=>{
  let basicHeaderParts = req.headers.authorization.split(' ');  
  let encodedString = basicHeaderParts.pop(); 
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');
  console.log(username,password)
  try {
   const isValid= await usersModel.authinticateUser(username,password);
    if(isValid){
      next();
    }
  } catch (error) {
     next(error) 
    }

}