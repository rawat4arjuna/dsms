import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";
import Institute from "./insitute";
import Role from "./role";

interface InstituteUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  instituteId: number;
  roleId: number;
}

interface InstituteUserCreationAttributes
  extends Optional<InstituteUserAttributes, "id"> {}

class InstituteUser
  extends Model<InstituteUserAttributes, InstituteUserCreationAttributes>
  implements InstituteUserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public instituteId!: number;
  public roleId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InstituteUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    instituteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Institute,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    tableName: "InstituteUsers",
    sequelize,
  }
);

export default InstituteUser;
