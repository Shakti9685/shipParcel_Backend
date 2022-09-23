const router = require("express").Router();

// bring in models and controllers
const createPost = require("../../controllers/post/createPost");
const getPosts = require("../../controllers/post/getPosts");
const getFeed = require("../../controllers/post/getFeed");
const getPost = require("../../controllers/post/getPost");
const getBookMarkedPosts = require("../../controllers/post/bookmarkedPosts");
const getComments = require("../../controllers/post/getComments");
const updatePost = require("../../controllers/post/updatePost");
const deletePost = require("../../controllers/post/deletePost");
const postRating = require("../../controllers/post/postRating");
const deleteComment = require("../../controllers/post/deleteComment");
const postComment = require("../../controllers/post/postComment");
const updateComment = require("../../controllers/post/updateComment");
const addBookmark = require("../../controllers/post/addBookmark");
const removeBookmark = require("../../controllers/post/removeBookmark");
const purchasePost = require("../../controllers/post/purchasePost");
const getHighlights = require("../../controllers/post/getHighlights");
const addToHighlights = require("../../controllers/post/addToHighlights");
const removeFromHighlights = require("../../controllers/post/removeFromHighlights");
const getStats = require("../../controllers/post/stats/getStats");

// Get all posts
router.get("/", getPosts);

// get bookMarkedPosts ,
router.get("/bookmark", getBookMarkedPosts);

// get highlights
router.get("/highlights", getHighlights);

// get highlights
router.post("/:id/highlights", addToHighlights);

// get highlights
router.delete("/:id/highlights", removeFromHighlights);

// get Post and comments , a particular post with comments
router.get("/:id", getPost);

// get comments , a particular post with comments
router.get("/:id/comments", getComments);

// register a user
router.post("/create", createPost);

// post comment
router.post("/:id/comment", postComment);

// post rating
router.post("/:id/rating", postRating);

// delete post
router.delete("/:id", deletePost);

// delete comment on post
router.delete("/:id/comment/:commentID", deleteComment);

// update post
router.put("/:id", updatePost);

// update post comment , a particular comment on post
router.put("/:id/comment/:commentID", updateComment);

// bookmark a post
router.post("/:id/bookmark", addBookmark);

// remove a post bookmark
router.delete("/:id/bookmark", removeBookmark);

// purchase a post
router.post("/:id/purchase", purchasePost, getPost);

// get post stats
router.get("/:id/stats", getStats);

// get feed
router.post("/feed", getFeed);

module.exports = router;
