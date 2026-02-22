import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

export class RelatorioMes extends Model {
  declare id: number;
  declare data: string;
}

RelatorioMes.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    data: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "relatorio_mes" }
);
