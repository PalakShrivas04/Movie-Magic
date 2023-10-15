import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected to Database and Server is running")
    )
  )
  .catch((e) => console.log(e));

//Ejj7d0cKbZBupLBF
