import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";
import bcrypt from "bcrypt";

// Define the User attributes interface
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  type: string;
  password: string;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
}

// Define the attributes required for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public type!: string;
  public password!: string;

  public passwordResetToken!: string | null;
  public passwordResetExpires!: Date | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Check if the password is correct
  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
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
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
    sequelize, // passing the `sequelize` instance is required
    hooks: {
      // Before creating a user, hash the password
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      // Before updating a user, hash the password if it was changed
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
