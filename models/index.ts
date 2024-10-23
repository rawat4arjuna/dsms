import sequelize from "./sequelize";
import User from "./user";

import Institute from "./insitute";
import Department from "./department";
import Role from "./role";
import InstituteUser from "./insituteUser";
import Student from "./student";

// Define associations
Institute.hasMany(Department, { foreignKey: "instituteId" });
Department.belongsTo(Institute, { foreignKey: "instituteId" });

Institute.hasMany(InstituteUser, { foreignKey: "instituteId" });
InstituteUser.belongsTo(Institute, { foreignKey: "instituteId" });

Role.hasMany(InstituteUser, { foreignKey: "roleId" });
InstituteUser.belongsTo(Role, { foreignKey: "roleId" });

Department.hasMany(Student, { foreignKey: "departmentId" });
Student.belongsTo(Department, { foreignKey: "departmentId" });
const models = {
  User,
  Institute,
  Department,
  Role,
  InstituteUser,
  Student,
};

export { sequelize };
export default models;
