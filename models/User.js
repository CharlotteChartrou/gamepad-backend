const mongoose = require("mongoose");

const User = mongoose.model('User', {
    username: String, 
    email :  String,
    token : String, 
    hash: String, 
    salt: String,
    GamesCollection: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],}
})

module.exports= User;
