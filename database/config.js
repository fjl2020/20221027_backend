const mongoose = require("mongoose");


const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CONN, {});
    console.log('db Connected')
  } catch (error) {
    console.log(error);
  }
};

module.exports= {dbConnection}