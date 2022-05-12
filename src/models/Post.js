const { DataTypes, Sequelize } = require("sequelize");
const Post = sequelize.define(
  "Post",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

(async function () {
  await Post.sync();
})();

module.exports = Post;
