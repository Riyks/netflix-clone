//const express =require('express'); commonjs
import express from 'express'; //esm(ecmascript)-modules
import authRoutes from "./routes/auth.route.js";
import path, { dirname } from "path";

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from "./middleware/protectroute.js";

import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import cookieParser from 'cookie-parser';
import  searchRoutes  from "./routes/search.route.js";
// import dotenv from "dotenv";
// dotenv.config(); WE MADE A WHOLE SEP FOLDER FOR THIS CONFIG
const app = express();

const PORT=ENV_VARS.PORT;
const __dirname=path.resolve();

// console.log("MONGO_URI: ",process.env.MONGO_URI) iski jagah we re doing const PORT WALA
app.use(express.json());//will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);

if(ENV_VARS.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log("server started at http://localhost:"+PORT);
    connectDB();

});

