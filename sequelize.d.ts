import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const UserFactory = (sequelize: Sequelize): UserStatic => {
  return <UserStatic>sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};

export { UserFactory };
