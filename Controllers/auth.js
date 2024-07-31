const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/User")

const registerControler = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturepath, friends, location, occupation } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName, lastName, email, password: passwordHash, picturepath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 10000), impressions: Math.floor(Math.random() * 10000)
        });
        await newUser.save();
        res.status(201).json(newUser)
    }
    catch (err) {
        console.log(err);
    }
}

const loginControler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!user) return res.status(400).json({message:"User does not exist"});
        if(!passwordMatch) res.status(400).json({message:`Invalid password`});
        
        const token = jwt.sign({id:user._id}, user.password);
        delete user.password;
        res.status(200).json({token,user})
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { registerControler, loginControler };