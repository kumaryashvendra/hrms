import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    logging: false, // Set to true if you want SQL logs
  }
);

// Test connection function (optional)
export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    // Sync all models (create tables if not exist)
    await sequelize.sync({ alter: true }); // or { force: true } to drop and recreate tables
    console.log('PostgreSQL Connected...');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

export default sequelize;
