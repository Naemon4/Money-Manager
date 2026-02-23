// src/models/Gastos.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";
import { RelatorioMes } from "./RelatorioMes";

export class ReservaOuInvestimento extends Model {
  declare id: number;
  declare descricao: string;
  declare valor: number;
  declare data_que_foi_pago: string;
}

ReservaOuInvestimento.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descricao: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    data_que_foi_pago: { type: DataTypes.STRING, allowNull: false}
  },
  { sequelize, modelName: "reserva_ou_investimento" }
);

RelatorioMes.belongsToMany(ReservaOuInvestimento, { through: "RelatorioReservaOuInvestimento" });
ReservaOuInvestimento.belongsToMany(RelatorioMes, { through: "RelatorioReservaOuInvestimento" });

