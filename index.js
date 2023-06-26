const {startServer}=require('./src/server');
const {sequelize}=require('./src/auth/models/index')
require('dotenv').config()
const PORT =process.env.PORT;
sequelize.sync()
  .then(() => {
    startServer(PORT);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });