const PostModel = require('../Models/Posts');
const UserModel = require('../Models/User')

const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await UserModel.findById(userId);
        const newPost = new PostModel({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.userPicturePath,
            picturePath,
            likes: {},
            comments: []
        })
        console.log(user, newPost);
        await newPost.save();
        const post = await PostModel.find();
        console.log(post);
        res.status(201).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err })
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const post = await PostModel.find();
        res.status(201).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err })
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const post = await PostModel.find({ userId });
        console.log(post);
        res.status(201).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err })
    }
}

const likedPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await PostModel.findById(id);
        const isLiked = await PostModel.likes.get(userId);
        console.log(isLiked);
        res.status(201).json();
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

module.exports = { createPost, getFeedPosts, getUserPosts, likedPost }