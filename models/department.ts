import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";
import Institute from "./insitute";

interface DepartmentAttributes {
  id: number;
  name: string;
  instituteId: number;
}

interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, "id"> {}

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id!: number;
  public name!: string;
  public instituteId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Department.init(
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
    instituteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Institute,
        key: "id",
      },
    },
  },
  {
    tableName: "Departments",
    sequelize,
  }
);

export default Department;
