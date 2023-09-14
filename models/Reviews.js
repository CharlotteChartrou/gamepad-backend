const mongoose = require("mongoose");

const Reviews = mongoose.model('Review', {
    title: String, 
    text: String, 
    owner : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

module.exports= Reviews