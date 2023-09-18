const mongoose = require("mongoose");

const Reviews = mongoose.model('Review', {
    title: String, 
    text: String, 
    game_id: String,
    owner : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

module.exports= Reviews