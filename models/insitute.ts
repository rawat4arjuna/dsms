import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";

interface InstituteAttributes {
  id: number;
  name: string;
  address: string;
}

interface InstituteCreationAttributes
  extends Optional<InstituteAttributes, "id"> {}

class Institute
  extends Model<InstituteAttributes, InstituteCreationAttributes>
  implements InstituteAttributes
{
  public id!: number;
  public name!: string;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Institute.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    address: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "Institutes",
    sequelize,
  }
);

export default Institute;
