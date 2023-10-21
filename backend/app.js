import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
dotenv.config();

const app = express();


//middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected to Database and Server is running")
    )
  )
  .catch((e) => console.log(e));


