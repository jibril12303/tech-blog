const { DataTypes, } = require("sequelize");
const User = require("./User");
const Comment = sequelize.define(
  "Comment",
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
        type :DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    // Other model options go here
  }
);


// Comment.hasOne(User,{
//   foreignKey: 'PostId',
//   as: 'User'
// }); // A HasOne B
// User.belongsTo(Comment,{
//   foreignKey:  'postId',
//   as: 'Comment'

// }); // A BelongsTo 

(async function () {
  await Comment.sync();
})();

module.exports = Comment;
