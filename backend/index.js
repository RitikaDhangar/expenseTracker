const express = require("express");
const app = express();
const cors = require('cors');
const sequelize = require('./config/database')
const UserRouter=require('./routes/UserRouter')
app.use(express.json());
app.use(cors());
app.use(UserRouter)

const startServer = async () => {
  try {
    await sequelize.sync(
      // { force: true }
    );
    app.listen(3000, () => {
      console.log('listen to the server');
    })
  } catch (err) {
    console.log('Unable to correct the db',err);
  }
}

startServer()