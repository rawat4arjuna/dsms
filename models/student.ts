import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";
import Department from "./department";

interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public departmentId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
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
    departmentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
    },
  },
  {
    tableName: "Students",
    sequelize,
  }
);

export default Student;
