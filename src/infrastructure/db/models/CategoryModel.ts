import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { Category } from "@/src/domain/entities/Category";

const CategoryModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<Category>> => {
  const Category = sequelize.define<Model<Category>>("category", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Category;
};

export default CategoryModel;
