const express= require("express");
const router = express.Router();

const User = require("../models/User");
const SHA56= require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64")
const uid2 = require("uid2")
const isAuthentificated = require("../middlewares/isAuthenticated");
const app = express();
app.use(express.json());

router.post("/signup", async (req, res) => {
    const password = req.body.password
    const salt = uid2(16); 
    const hash = SHA56(password + salt).toString(encBase64);
    const token = uid2(16);


    try{

        const foundUser = await User.findOne({email : req.body.email})

        if (foundUser === null) { const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            token, 
            hash, 
            salt,

        })

        console.log(token, hash, salt)

        await newUser.save();
        res.status(200).json(newUser)} else {
            res.status(200).json("email already exist in our data")
        }}

       
    catch(error) {console.log(error);
    res.status(400).json(error.message)}
})

router.post("/login", async (req, res) => {
    try {
console.log(req.body)
const foundUser = await User.findOne({email: req.body.email});
console.log(foundUser)
const newSaltPassword = req.body.password + foundUser.salt;
const newHash = SHA56(newSaltPassword).toString(encBase64);
console.log("newSaltedPassword ===>", newSaltPassword, "newhash ===>", newHash);

if (newHash === foundUser.hash) {
    return res.status(200).json({_id: foundUser._id, username : foundUser.username, token : foundUser.token})
} else { res.status(200).json("password or email incorrect")}



    } catch (error) {
        res.status(400).json(error.message)
    }

})

router.get("/user", isAuthentificated, async (req, res) => {
    try {
      
console.log(req.user) 
        
        res.status(200).json(req.user)} catch (error) {res.status(400).json("error")}
})



module.exports= router;