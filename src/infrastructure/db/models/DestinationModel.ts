import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { Destination } from "@/src/domain/entities/Destination";

const DestinationModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<Destination>> => {
  const Destination = sequelize.define<Model<Destination>>("destination", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    location_id: { type: DataTypes.UUID, allowNull: false,}
  });
  return Destination;
};

export default DestinationModel;
