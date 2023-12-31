import express from "express";
import path from "path";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
//dotenv
import dotenv from "dotenv";
dotenv.config();
//dotenv

//cookie-parser
import cookieParser from "cookie-parser";
//cookie-parser

// Database connection
import connectDB from "./config/db.js";
connectDB();
// Database connection

import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// port, app and body parser
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// port, app and body parser

// cookie parser
app.use(cookieParser());
// cookie parser

// APIs
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
// APIs

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API IS RUNNING!!!");
  });
}

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server running in ${port}`));
