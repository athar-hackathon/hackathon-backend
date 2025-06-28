import { DataTypes, Sequelize } from "sequelize";
import { config } from "@/src/config";
import UserModel from "./models/UserModel";
import LocationModel from "./models/LocationModel";

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

db.user = User;
db.location = Location;

Location.hasMany(db.user, { foreignKey: "locationId", as: "users" });
User.belongsTo(db.location, {
  foreignKey: "locationId",
  as: "location",
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err: Error) => {
    console.error("Error during database synchronization:", err);
  });
