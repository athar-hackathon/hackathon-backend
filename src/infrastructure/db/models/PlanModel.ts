import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { Plan } from "@/src/domain/entities/Plan";

const PlanModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<Plan>> => {
  const Plan = sequelize.define<Model<Plan>>("plan", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    startDate: {type: DataTypes.DATE, allowNull:false},
    endDate: {type: DataTypes.DATE, allowNull:false},
    volunteerNumber: { type: DataTypes.INTEGER, allowNull: true },
    appliedVolunteerNumber: { type: DataTypes.INTEGER, allowNull: true },
    locationId: { type: DataTypes.UUID, allowNull: false, },
    isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    isPaid: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    price: { type: DataTypes.INTEGER, allowNull: false, },
  });
  return Plan;
};

export default PlanModel;
