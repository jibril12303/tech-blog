const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const formatParsing = require("../helpers/formatParsing");


const getDashboardPost = async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      as: "User",
    },
  });
  const postParsing = formatParsing(posts);
  res.render("dashboard", { title: "Dashboard", posts: postParsing })
}

const getHomePost = async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      as: "User",
    },
  });
  const postParsing = formatParsing(posts);
  res.render("home", { title: "The Tech Blog", posts: postParsing });
}

const getAddPostHandlerbar = (req, res) => {
  res.render("addpost", { title: "Dashboard" });
}




const addPost= async (req, res) => {
  const post = Post.build({
    title: req.body.title,
    content: req.body.content,
    userId: req.userId,
  });
  await post.save();
  res.redirect("/");
}

const getPostById = async (req, res) => {
  const post = await Post.findAll({
    include: {
      model: User,
      as: "User",
    },
    where: {
      id: req.params.id,
    },
  });
  const comment = await Comment.findAll({
    include: {
      model: User,
      as: "User",
    },
    where: {
      postId: req.params.id,
    },
  });
  

  const postParsing = formatParsing(post);
  console.log(postParsing,"Fsghfj")
  const commentsParsing = formatParsing(comment);
  res.render("postDetail", {
    title: "The Tech Blog",
    post: postParsing[0],
    comments: commentsParsing,
  });
}

const addCommentToPostById= async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) {
    res.send({ error: "no post found" });
    return;
  }
  const comment = Comment.build({
    content: req.body.comment,
    postId: req.params.id,
    userId: req.userId,
  });
  await comment.save();
  res.redirect("/posts/" + req.params.id);
}

// update post by id
const getEditPostHandlebar = async (req, res) => {
  const post = await Post.findAll({
    where: {
      id: req.params.id,
    },
  });
  const postParsing = formatParsing(post)[0];
  res.render("editPost", { title: "Dashboard", post: postParsing });
}

const updatPostById = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });

  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.redirect("/dashboard")
}

const deletPostById = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });

  await post.destroy();
  res.redirect("/dashboard");
};



module.exports = {
  getDashboardPost,
  getHomePost,
  getAddPostHandlerbar,
  addPost,
  getPostById,
  addCommentToPostById,
  getEditPostHandlebar,
  updatPostById,
  deletPostById,
};