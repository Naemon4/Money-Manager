import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";
import { RelatorioMes } from "./RelatorioMes";

export class Gastos extends Model {
  declare id: number;
  declare descricao: string;
  declare valor: number;
  declare data_que_foi_pago: string;
}

Gastos.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descricao: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    data_que_foi_pago: { type: DataTypes.STRING, allowNull: false}
  },
  { sequelize, modelName: "gastos" }
);

RelatorioMes.belongsToMany(Gastos, { through: "RelatorioGastos" });
Gastos.belongsToMany(RelatorioMes, { through: "RelatorioGastos" });