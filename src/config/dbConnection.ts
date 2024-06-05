import mysql, { PoolConfig } from "mysql"
import dotevn from "dotenv"
dotevn.config()

// createing connnection to the mysql database
const dbConnection = mysql.createConnection({
  connectionLimit: 12, // Adjust this value based on your requirements
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  // port: process.env.DATABASE_PORT
} as PoolConfig);

export default dbConnection