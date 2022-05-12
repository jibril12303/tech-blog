const express = require("express");
const auth = require("../helpers/auth");
const router = express.Router();

const {
  getDashboardPost,
  getHomePost,
  getAddPostHandlerbar,
  addPost,
  getPostById,
  addCommentToPostById,
  getEditPostHandlebar,
  updatPostById,
  deletPostById,
} = require("../controllers/postController");
const { route } = require("./userRoute");



router.get("/dashboard", auth, getDashboardPost);
router.get("/",getHomePost);
router.get("/post/add", auth, getAddPostHandlerbar);
router.post("/post", auth, addPost);
router.get("/posts/:id", getPostById);
router.post("/post/comment/:id", auth, addCommentToPostById);
// update post by id
router.get("/posts/edit/:id", auth, getEditPostHandlebar);
router.put("/posts/:id", auth, updatPostById);
router.delete("/posts/:id", auth, deletPostById);

module.exports = router;
