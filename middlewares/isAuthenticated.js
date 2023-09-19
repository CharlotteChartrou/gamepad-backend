const User = require("../models/User");

const isAuthentificated = async (req, res, next) => {

    const tokenFound = req.headers.authorization.replace("Bearer ", "")
  console.log(tokenFound)
  console.log("coucou")

if (req.headers.authorization) {
    const user = await User.findOne({
        token : tokenFound,
    }).select("_id username avatar");
 console.log(user)
    
    if (!user) {
        return res.status(401).json({error: "Unauthorized1"});
    } else { if(user) {req.user = user; }
    return next();
}}
    else { return res.status(401).json({error: "Unauthorized2"})}


}


module.exports= isAuthentificated;