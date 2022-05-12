const express = require("express");
const path = require('path')
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./src/db/connection");
const userRoute = require("./src/routes/userRoute");
const postRoute = require("./src/routes/postRoute");
const Comment = require("./src/models/Comment");
const User = require("./src/models/User");
const Post = require("./src/models/Post");
const { dateFormat } = require("./src/helpers/hbs");
require("dotenv").config({
  path: path.resolve(process.cwd(), '.env'),
});


const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.engine(
  "handlebars",
  engine({
    helpers: {
      dateFormat: dateFormat
    },
  })
);
app.set("view engine", "handlebars");

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    key: "express.sid",
    secret: "secret",
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000  //24 hours
    },
  })
);
sessionStore.sync();
// local varable 
app.use((req, res, next) => {
  res.locals.user = req.session.userId || null;
  next();
});

User.hasMany(Comment, {
      foreignKey: "userId",
      as: "Comment",
    }); // A HasOne B
    Comment.belongsTo(User, {
      foreignKey: "userId",
      as: "User",
    });
    
    User.hasMany(Post, {
      foreignKey: "userId",
      as: "Post",
    });
    Post.belongsTo(User, {
      foreignKey: "userId",
      as: "User",
    });

// Routes
app.use(express.static("public"));
app.use(userRoute);
app.use(postRoute);

app.listen(PORT, () => {
  console.log("Application is Running on Port", PORT);
});
