import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { DestinationTripModel } from "@/src/domain/entities/DestinationPlanModel";

const DestinationTripModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<DestinationTripModel>> => {
  const DestinationTrip = sequelize.define<Model<DestinationTripModel>>("destination_plan", {
    destination_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    plan_id: { type: DataTypes.UUID, allowNull: false, unique: true },
  });
  return DestinationTrip;
};

export default DestinationTripModel;
