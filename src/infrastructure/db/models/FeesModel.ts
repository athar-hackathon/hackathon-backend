import {
    Model,
    DataTypes as SequelizeDataTypes,
    ModelCtor,
    Sequelize,
  } from "sequelize";
  import { Fees } from "@/src/domain/entities/Fees";
  
  const FeesModel = (
    sequelize: Sequelize,
    DataTypes: typeof SequelizeDataTypes
  ): ModelCtor<Model<Fees>> => {
    const Fees = sequelize.define<Model<Fees>>("fees", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      fees: { type: DataTypes.INTEGER, allowNull: false },
      plan_id: { type: DataTypes.UUID, allowNull: false, },
    });
    return Fees;
  };
  
  export default FeesModel;
  