import {DataTypes} from 'sequelize';
import db from "../db/db.js";

const Discipline = db.define('discipline', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  type: {type: DataTypes.STRING, allowNull: false},
  date: {type: DataTypes.STRING, allowNull: false},
  callData: {type: DataTypes.STRING, allowNull: false, unique: true},
});

const UserReg = db.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  chatId: {type: DataTypes.BIGINT, allowNull: false},
  telegramName: {type: DataTypes.TEXT,},
  userName: {type: DataTypes.TEXT},
  ref: {type: DataTypes.BIGINT, allowNull: false},
  commandName: {type: DataTypes.STRING},
  registrationType: {type: DataTypes.STRING},
  ip: {type: DataTypes.STRING},
  city: {type: DataTypes.STRING},
  region: {type: DataTypes.STRING},
  country: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING || DataTypes.INTEGER, allowNull: false},
  name: {type: DataTypes.STRING, allowNull: false},
  lotteryRegFull: {type: DataTypes.BOOLEAN},
  steamName: {type: DataTypes.STRING},
  rating: {type: DataTypes.STRING},
  position: {type: DataTypes.STRING || DataTypes.INTEGER},
})

const Logs = db.define('logs', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  chatId: {type: DataTypes.BIGINT || DataTypes.STRING, allowNull: false},
  body: {type: DataTypes.TEXT || DataTypes.STRING || DataTypes.JSON, allowNull: false}
})

Discipline.hasMany(UserReg);
UserReg.belongsTo(Discipline);


export {
  Discipline, UserReg, Logs
};