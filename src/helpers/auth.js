const auth = (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/");
    return;
  }
  req.userId=userId
  next();

};

module.exports = auth;
