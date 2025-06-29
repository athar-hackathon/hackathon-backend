import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { Association } from "@/src/domain/entities/Association";

const AssociationModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<Association>> => {
  const Association = sequelize.define<Model<Association>>("association", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    intagram_url: { type: DataTypes.INTEGER, allowNull: false},
    facebook_url: { type: DataTypes.INTEGER, allowNull: false},
    twitter_url: { type: DataTypes.INTEGER, allowNull: false},
    owner_id: { type: DataTypes.UUID, allowNull: false},
  });
  return Association;
};

export default AssociationModel;
