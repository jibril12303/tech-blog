const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getSigninHandlebar = (req, res) => {
  res.render("signin", { title: "The Tech Blog" });
};

const userSignIn = async (req, res) => {
  const user = await User.findOne({
    where: {
      userName: req.body.username,
    },
  });
  if (!user) {
    res.send({ error: "no user found" });
    return;
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.send({ error: "invalid password" });
    return;
  }
  const a = user.toJSON()
  req.session.userId = a.id;
  res.redirect("/dashboard")
};

const getUserSignUpHandlerbar= (req, res) => {
  res.render("signup", { title: "The Tech Blog" });
};

const createUser = async (req, res) => {
  const userExist = await User.findOne({ where: { userName: req.body.username } });
  if(userExist){
    res.render("signup",{
      title: "The Tech Blog",
      error: "UserName already exist"
    })
    return;
  }
  const user = User.build({
    userName: req.body.username,
    password: req.body.password,
  });
  user.password = await bcrypt.hash(user.password, 8);
  await user.save();
  req.session.userId = user.id;
  res.redirect("/dashboard");
};

const userLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
module.exports = {
  getSigninHandlebar,
  userSignIn,
  getUserSignUpHandlerbar,
  createUser,
  userLogout
};