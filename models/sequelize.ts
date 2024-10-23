import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
const sequelize = new Sequelize(
  process.env.DB_NAME || "u956971248_dsms",
  process.env.DB_USER || "u956971248_root",
  process.env.DB_PASS || "Qvl@12345",
  {
    host: process.env.DB_HOST || "193.203.184.158",
    dialect: "mysql",
    dialectModule: mysql2,
    logging: console.log,
  }
);

export default sequelize;
