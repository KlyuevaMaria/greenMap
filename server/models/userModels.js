const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
});

const Notification = sequelize.define('notification', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false },
    description: {
        type: DataTypes.TEXT, 
        allowNull: false },
    img: {
        type: DataTypes.STRING,
        allowNull: true}
});


User.hasMany(Notification);
Notification.belongsTo(User);

module.exports = {
  User,
  Notification,
}


// module.exports = { User }; 
