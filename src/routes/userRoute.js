const express = require("express");
const router = express.Router();

const {
  getSigninHandlebar,
  userSignIn,
  getUserSignUpHandlerbar,
  createUser,
  userLogout,
} = require("../controllers/userControllers");


router.get("/user/signin",getSigninHandlebar);
router.post("/user/signin", userSignIn);
router.get("/user/signup", getUserSignUpHandlerbar);
router.post("/user/signup", createUser);
router.get("/user/logout", userLogout);

module.exports = router;
