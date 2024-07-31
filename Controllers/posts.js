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
        console.log(post);
        const isLiked = await post.likes.get(userId);
        console.log(isLiked);
        if (isLiked) {
            post.likes.delete(userId)
        }
        else {
            post.likes.set(userId, true)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, { likes: post.likes },{new: true})

        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

module.exports = { createPost, getFeedPosts, getUserPosts, likedPost }