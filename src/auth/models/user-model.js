const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {sequelize,DataTypes}=require('./index');
const usersModel=sequelize.define('User',{
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  usersModel.authinticateUser=async function(username,password){
    const user = await usersModel.findOne({ where: { username: username } });
    if(user){
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user
      }
      else {
        throw new Error('Invalid User');
    }
    }else throw new Error('Invalid User');

  
}
usersModel.hashPassword=async (password)=>{
const hashed=await bcrypt.hash(password, 10);
return hashed;
}
usersModel.beforeCreate('hashing password before creation',async(user,options)=>{
  const hashedPassword=await usersModel.hashPassword(user.password);
  user.password=hashedPassword;
})
  module.exports=usersModel
  