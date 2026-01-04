import express from "express";
const app = express();
import cors from "cors";
import sequelize from "./config/database.js";
import UserRouter from "./routes/UserRouter.js";
app.use(express.json());
app.use(cors());
app.use(UserRouter);

const startServer = async () => {
  try {
    await sequelize
      .sync
      // { force: true }
      ();
    app.listen(9000, () => {
      console.log("listen to the server");
    });
  } catch (err) {
    console.log("Unable to correct the db", err);
  }
};

startServer();

/*
1.Login and SignUp user Hi [name]
2.Navigation properly Signup->logout button
3.logout/login redireact 
4.After sometime relogin using jwt token
5.before signUp/login all pages are unaccessable  
6.Neither navbar will be show
7.Redux System 
*/
