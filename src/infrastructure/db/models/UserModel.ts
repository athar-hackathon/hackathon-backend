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
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.NUMBER, allowNull: true },
    gender: { type: DataTypes.ENUM("MALE", "FEMALE"), allowNull: true },
    age: { type: DataTypes.NUMBER, allowNull: true },
    profilePicture: { type: DataTypes.TEXT, allowNull: true },
    locationId: { type: DataTypes.NUMBER, allowNull: false },
  });
  return User;
};

export default UserModel;
