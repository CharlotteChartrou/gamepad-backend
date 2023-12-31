const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://charlottechartrou:el8oir8tWWuLxjF7@cluster0.2ashdxs.mongodb.net/gamepad`);
cloudinary.config({
    cloud_name: "dujlkkvmc",
    api_key: "551169559462953",
    api_secret: "RmE-BoJjONIPqMQ_6yrC2kTsguE"
  });


app.get("/", (req, res)=> {
    try { res.status(200).json("Welcome on GamePad")} catch (error){
        return res.status(400).json(error.message)
    }
   
})

const userRoutes= require("./routes/user")
app.use(userRoutes);

const gamesRoutes = require("./routes/games")
app.use(gamesRoutes)

app.all("*", (req, res) => {
    return res.json("Page not found 🥺");
})

app.listen(process.env.PORT, ()=> {
    console.log("Server has started 😎")
})