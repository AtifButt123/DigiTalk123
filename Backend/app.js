import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import universityRoute from "./routes/universities.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
// mongoose.set("strictQuery", true);


mongoose.connect(process.env.CONN_STRING,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("Database Connected")).catch((err)=>{
    console.log(err);
})


// const ejs = require("ejs");
// const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: true,
  credentials: true,
};

app.get("/", (req, res) => {
  res.send("This is the default route");
});


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/universities", universityRoute);

// for cookies
app.use(cookieParser());



app.listen(port, function () {
  console.log("Server started on port 3000");
});