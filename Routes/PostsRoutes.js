const express = require("express");
const routes = express.Router();
const PostController = require('../Controllers/posts')

routes.post('/', PostController.createPost);
routes.get('/', PostController.getFeedPosts);
routes.get('/:id/allPosts', PostController.getUserPosts);
routes.patch('/like/:id', PostController.likedPost);

module.exports = routes;