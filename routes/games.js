const express = require("express");
const axios = require("axios");
const router = express.Router();


const Review = require("../models/Reviews");

const isAuthentificated = require("../middlewares/isAuthenticated");
const app = express();
app.use(express.json());

router.get("/games", async (req, res)=>{
    try {
        const search = req.query.search || "";
        const ordering = req.query.ordering || "";
    const my_api_key = process.env.MY_API_KEY;
    console.log(ordering);

    const response = await axios.get(`https://api.rawg.io/api/games?key=${my_api_key}&search=${search}&ordering=${ordering}`)
    res.status(200).json(response.data)}
    catch (error) {res.status(400).json(error.response)}
})

router.get("/games/:id", async (req, res)=>{
    try {
    const my_api_key = process.env.MY_API_KEY;
const id = req.params.id
    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${my_api_key}`)
  
    res.status(200).json(response.data)}
    catch (error) {
        
        console.log(error)
        res.status(400).json(error.response)}
})

router.post("/games/:id/reviews", isAuthentificated, async (req, res) => {
/*     console.log(req.body); */
    const {title, text, game_id} = req.body
    try {

        const newReview = new Review ({
title : title, 
text : text, 
game_id : game_id,
owner : req.user

        })
console.log(newReview);
        await newReview.save();

        res.status(201).json("review upload")

    } catch (error) {res.status(400).json(error.message)}
})

router.get("/games/:id/reviews", async (req, res)=> {
    try {
        const id = req.params.id || null;
        const foundReview = await Review.find({game_id : id})
/*         console.log(foundReview)
        console.log(id) */
        res.status(200).json(foundReview)
    } catch (error) {res.status(400).json("error")}})

module.exports= router;