import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";
import { RelatorioMes } from "./RelatorioMes";

export class ItensTabela extends Model {
  declare id: number;
  declare nome: string;
  declare valor: number;
  declare data_que_foi_pago: string;
  declare tipo: string;
}

ItensTabela.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    data_que_foi_pago: { type: DataTypes.STRING, allowNull: false},
    tipo: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: "ItensTabela" }
);

RelatorioMes.belongsToMany(ItensTabela, { through: "Relatorio_Itens" });
ItensTabela.belongsToMany(RelatorioMes, { through: "Relatorio_Itens" });