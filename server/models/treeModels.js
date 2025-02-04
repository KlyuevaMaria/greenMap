const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { User } = require("./userModels");

const Tree = sequelize.define("tree", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  latitude: { type: DataTypes.DECIMAL(9, 7), allowNull: false },
  longitude: { type: DataTypes.DECIMAL(9, 7), allowNull: false },
  adress: { type: DataTypes.STRING, allowNull: false },
  owner: { type: DataTypes.STRING, allowNull: false },
  year_of_planting: { type: DataTypes.INTEGER, allowNull: false },
  height: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  diameter: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
  number_of_barrels: { type: DataTypes.INTEGER, allowNull: false },
  crown_diameter: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  //   date_added: { type: DataTypes.STRING, allowNull: false },
});

const Status = sequelize.define("status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status_name: { type: DataTypes.STRING, allowNull: false },
});

const Special_note = sequelize.define("special_note", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  note: { type: DataTypes.TEXT, allowNull: true },
});

const Environment = sequelize.define("environment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Condition = sequelize.define("condition", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Document = sequelize.define("document", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Photo = sequelize.define("photo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

// Tree.hasOne(Status);
// Status.belongsTo(Tree);

User.hasOne(Tree);
Tree.belongsTo(User);

Status.hasOne(Tree);
Tree.belongsTo(Status);

Special_note.hasOne(Tree);
Tree.belongsTo(Special_note);

Environment.hasOne(Tree);
Tree.belongsTo(Environment);

Condition.hasOne(Tree);
Tree.belongsTo(Condition);

Document.hasMany(Tree);
Tree.belongsTo(Document);

Photo.hasMany(Tree);
Tree.belongsTo(Photo);

module.exports = {
  Tree,
  Status,
  Special_note,
  Environment,
  Condition,
  Document,
  Photo,
};
