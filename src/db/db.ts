import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

const DB_NAME = "money";
const DB_USER = "root";
const DB_PASS = "";
const DB_HOST = "localhost";

async function ensureDatabase() {
  const connection = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASS });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

export async function connectDB() {
  try {
    await ensureDatabase(); // garante que o banco exista
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}
