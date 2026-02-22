import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";
import { RelatorioMes } from "./RelatorioMes";

export class Entrada extends Model {
  declare id: number;
  declare nome: string;
  declare valor: number;
  declare relatorioId: number;
}

Entrada.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: "entrada" }
);

RelatorioMes.hasMany(Entrada, { foreignKey: "relatorioId" });
Entrada.belongsTo(RelatorioMes, { foreignKey: "relatorioId" });
