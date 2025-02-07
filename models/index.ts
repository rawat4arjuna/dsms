import sequelize from "./sequelize";
import User from "./user";
import Role from './role'

// Define associations

const models = {
  User,
  Role
};

export { sequelize };
export default models;
