import { DataTypes, Sequelize } from "sequelize";
import { config } from "@/src/config";
import UserModel from "./models/UserModel";
import DestinationPlanModel from "./models/DestinationPlanModel";
import LocationModel from "./models/PlanModel";
import DestinationModel from "./models/DestinationModel";
import PlanModel from "./models/PlanModel";
import AssociationModel from "./models/AssociationModel";
import CategoryModel from "./models/CategoryModel";
import FeesModel from "./models/FeesModel";

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

db.user = User;
db.location = Location;
db.destination = Location;
db.plan = Plan;
db.destination_plan = Destination;
db.association = Association;
db.category = Category;
db.fees = Fees;

Destination.belongsToMany(Plan, { through: DestinationPlan, foreignKey: 'destination_id' });
Plan.belongsToMany(Destination, { through: DestinationPlan, foreignKey: 'plan_id' });

// Location.hasOne(Destination, { foreignKey: "location_id", as: "destination" });
// Location.belongsTo(Destination, { foreignKey: "location_id", as: "location" });

Association.hasOne(User, { foreignKey: "owner_id", as: "user" });
User.belongsTo(Association, { foreignKey: "owner_id", as: "association" });

Category.hasMany(Plan, { foreignKey: "category_id", as: "plans" });
Plan.belongsTo(Category, { foreignKey: "category_id", as: "category" });

Plan.hasMany(Fees, { foreignKey: "plan_id", as: "fees" });
Fees.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err: Error) => {
    console.error("Error during database synchronization:", err);
  });
