import { Model, DataTypes } from "sequelize";
import {sequelize} from "../sequelize";

export class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "user" }
);
