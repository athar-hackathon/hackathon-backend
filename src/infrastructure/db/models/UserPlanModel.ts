import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { UserPlan } from "@/src/domain/entities/UserPlan";

const UserPlanModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<UserPlan>> => {
  const UserPlan = sequelize.define<Model<UserPlan>>("user_plan", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'plans',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
  return UserPlan;
};

export default UserPlanModel; 