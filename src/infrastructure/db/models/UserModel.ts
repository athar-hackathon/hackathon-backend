import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { User } from "@/src/domain/entities/User";

const UserModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<User>> => {
  const User = sequelize.define<Model<User>>("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {type: DataTypes.ENUM('admin', 'associationOwner', 'volunteer'), allowNull:false},
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.INTEGER, allowNull: true },
    gender: { type: DataTypes.ENUM("MALE", "FEMALE"), allowNull: true },
    age: { type: DataTypes.INTEGER, allowNull: true },
    profilePicture: { type: DataTypes.TEXT, allowNull: true },
    locationId: { type: DataTypes.UUID, allowNull: false },
    isActive: {type: DataTypes.BOOLEAN, allowNull: false}
  });
  return User;
};

export default UserModel;
