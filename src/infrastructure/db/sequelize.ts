import { DataTypes, Sequelize } from "sequelize";
import { config } from "@/src/config";
import UserModel from "./models/UserModel";
import DestinationPlanModel from "./models/DestinationPlanModel";
import LocationModel from "./models/LocationModel";
import DestinationModel from "./models/DestinationModel";
import PlanModel from "./models/PlanModel";
import AssociationModel from "./models/AssociationModel";
import CategoryModel from "./models/CategoryModel";
import FeesModel from "./models/FeesModel";
import UserPlanModel from "./models/UserPlanModel";
import ReviewModel from "./models/ReviewModel";

export const sequelize = new Sequelize({
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.DB_SSL === "true"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
  logging: false,
});

export const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = UserModel(sequelize, DataTypes);
const Location = LocationModel(sequelize, DataTypes);
const Destination = DestinationModel(sequelize, DataTypes);
const Plan = PlanModel(sequelize, DataTypes);
const DestinationPlan = DestinationPlanModel(sequelize, DataTypes);
const Association = AssociationModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Fees = FeesModel(sequelize, DataTypes);
const UserPlan = UserPlanModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);

db.user = User;
db.location = Location;
db.destination = Destination;
db.plan = Plan;
db.destination_plan = DestinationPlan;
db.association = Association;
db.category = Category;
db.fees = Fees;
db.user_plan = UserPlan;
db.review = Review;

Destination.belongsToMany(Plan, { through: DestinationPlan, foreignKey: 'destination_id' });
Plan.belongsToMany(Destination, { through: DestinationPlan, foreignKey: 'plan_id' });

// Destination-Location association
Location.hasMany(Destination, { foreignKey: "location_id", as: "destinations" });
Destination.belongsTo(Location, { foreignKey: "location_id", as: "location" });

Association.hasOne(User, { foreignKey: "owner_id", as: "user" });
User.belongsTo(Association, { foreignKey: "owner_id", as: "association" });

Category.hasMany(Plan, { foreignKey: "category_id", as: "plans" });
Plan.belongsTo(Category, { foreignKey: "category_id", as: "category" });

Plan.hasMany(Fees, { foreignKey: "plan_id", as: "fees" });
Fees.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

Association.hasMany(Plan, { foreignKey: "associationId", as: "plans" });
Plan.belongsTo(Association, { foreignKey: "associationId", as: "association" });

// UserPlan relationships
User.hasMany(UserPlan, { foreignKey: "userId", as: "applications" });
UserPlan.belongsTo(User, { foreignKey: "userId", as: "user" });

Plan.hasMany(UserPlan, { foreignKey: "planId", as: "applications" });
UserPlan.belongsTo(Plan, { foreignKey: "planId", as: "plan" });

// Review relationships
User.hasMany(Review, { foreignKey: "volunteerId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "volunteerId", as: "volunteer" });

Association.hasMany(Review, { foreignKey: "associationId", as: "reviews" });
Review.belongsTo(Association, { foreignKey: "associationId", as: "association" });

db.sequelize
  .sync({ force: false
   })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err: Error) => {
    console.error("Error during database synchronization:", err);
  });
