import { Sequelize } from "sequelize";
import { config } from "@/src/config";
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

(async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ DB connected successfully');
      await sequelize.sync();
    } catch (err) {
      console.error('❌ Unable to connect to DB:', err);
    }
  })();
