import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
  }
);

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error: any) {
    console.error("Unable to connect to the database:", error.message || error);
  }
};

export default sequelize;
