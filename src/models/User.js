const {DataTypes } = require("sequelize");
const Comment = require("./Comment");
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    
    // Other model options go here

  }
);


 // A BelongsTo 

(async function(){
  await User.sync()
  // await User.drop();
})()

module.exports=User;