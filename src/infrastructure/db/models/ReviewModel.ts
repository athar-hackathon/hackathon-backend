import {
  Model,
  DataTypes as SequelizeDataTypes,
  ModelCtor,
  Sequelize,
} from "sequelize";
import { Review } from "@/src/domain/entities/Review";

const ReviewModel = (
  sequelize: Sequelize,
  DataTypes: typeof SequelizeDataTypes
): ModelCtor<Model<Review>> => {
  const Review = sequelize.define<Model<Review>>("review", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    rating: { 
      type: DataTypes.FLOAT, 
      allowNull: false,
      validate: {
        min: 1.0,
        max: 5.0
      }
    },
    comment: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        len: [1, 1000] // Minimum 1 character, maximum 1000
      }
    },
    volunteerId: { 
      type: DataTypes.UUID, 
      allowNull: false 
    },
    associationId: { 
      type: DataTypes.UUID, 
      allowNull: false 
    },
  });
  return Review;
};

export default ReviewModel; 