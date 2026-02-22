import express, { Request, Response } from "express";
import { sequelize, connectDB } from "./db/db"

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

sequelize.sync({ alter: true }).then(() => {
  console.log("Models sincronizados com o banco!");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
