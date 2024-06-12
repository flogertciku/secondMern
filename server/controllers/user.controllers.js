const User = require("../models/user.model");
require('dotenv').config();
module.exports.login= async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400).json("email not found");
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    //                              123456789=>   isjfd[oiqwefpoidjwqpdefiowqaopd;jaksklsa]
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400).json("password didn't match!");
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}


module.exports.register= (req, res) => {
    console.log(process.env.FIRST_SECRET_KEY)
  User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);
//  {id: "kjdsaiojdoasjdaposj;dasoi"} =>userToken =  asoidjioasjdioajpsdiopsjapdoisajpdoiajsoidpajsdio
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}


module.exports.logout= (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

