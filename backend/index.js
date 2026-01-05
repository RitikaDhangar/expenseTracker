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
      (
        // { force: true }
      );
    app.listen(9000, () => {
      console.log("listen to the server");
    });
  } catch (err) {
    console.log("Unable to correct the db", err);
  }
};

startServer();

/*
1. forgot password
2. Navbar
3. logout
*/
