import {
    Model,
    DataTypes as SequelizeDataTypes,
    ModelCtor,
    Sequelize,
  } from "sequelize";
  import { Location } from "@/src/domain/entities/Location";
  
  const LocationModel = (
    sequelize: Sequelize,
    DataTypes: typeof SequelizeDataTypes
  ): ModelCtor<Model<Location>> => {
    const User = sequelize.define<Model<Location>>("location", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        longitude: { type: DataTypes.FLOAT, allowNull: false, unique: true },
        latitude: { type: DataTypes.FLOAT, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: true },
        state: { type: DataTypes.STRING, allowNull: true},
        city: { type: DataTypes.STRING, allowNull: true},
        address: { type: DataTypes.STRING, allowNull: true},
    });
    return User;
  };
  
  export default LocationModel;
  