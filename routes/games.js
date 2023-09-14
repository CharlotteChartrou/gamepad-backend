const express = require("express");
const axios = require("axios");
const router = express.Router();

const Review = require("../models/Reviews");

const isAuthentificated = require("../middlewares/isAuthenticated");


router.get("/games", async (req, res)=>{
    try {
        const search = req.query.search || ""
    const my_api_key = process.env.MY_API_KEY;

    const response = await axios.get(`https://api.rawg.io/api/games?key=${my_api_key}&search=${search}`)
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
    try {

        const newReview = new Review ({
title : req.body.title, 
text : req.body.text, 
owner : req.user

        })
console.log(newReview);
        await newReview.save();

        res.status(201).json("review upload")

    } catch (error) {res.status(400).json(error.message)}
})

module.exports= router;