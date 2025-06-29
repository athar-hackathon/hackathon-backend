import { DataTypes, Sequelize } from "sequelize";
import { config } from "@/src/config";
import UserModel from "./models/UserModel";
import DestinationPlanModel from "./models/DestinationPlanModel";
import LocationModel from "./models/PlanModel";
import DestinationModel from "./models/DestinationModel";
import PlanModel from "./models/PlanModel";
import AssociationModel from "./models/AssociationModel";

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

db.user = User;
db.location = Location;

Location.hasMany(db.user, { foreignKey: "locationId", as: "users" });
User.belongsTo(db.location, {
  foreignKey: "locationId",
  as: "location",
});

Destination.belongsToMany(Plan, { through: DestinationPlan, foreignKey: 'destination_id' });
Plan.belongsToMany(Destination, { through: DestinationPlan, foreignKey: 'plan_id' });

Location.hasOne(Destination, { foreignKey: "location_id", as: "destination" });
Destination.belongsTo(Location, { foreignKey: "location_id", as: "location" });

Association.hasOne(Destination, { foreignKey: "owner_id", as: "user" });
User.belongsTo(Location, { foreignKey: "owner_id", as: "association" });

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err: Error) => {
    console.error("Error during database synchronization:", err);
  });
