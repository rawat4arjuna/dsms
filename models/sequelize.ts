import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/dev_db.sqlite3", // Path to the SQLite database file
  dialectModule: sqlite3,
  logging: console.log, // Set to `false` to disable logging
});

export default sequelize;
