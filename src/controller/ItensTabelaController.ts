import { Request, Response } from "express";
import { ItensTabela } from "../models/ItensTabela";
import { RelatorioMes } from "../models/RelatorioMes";
import { erroCustom } from "./ErroCustom";

const tiposItens = ["entrada", "gastos", "gastosFixos", "reservaInvestimento"]

export class ItensTabelaController {

    static async acharItem(nome: string, valor: string, data_que_foi_pago: string, tipo: string, relatorio_id: string) {

        try {
            const item = await ItensTabela.findOne({
                where: {
                    nome, valor, data_que_foi_pago, tipo
                },
                include: [
                    {
                        model: RelatorioMes,
                        where: { id: relatorio_id },
                        through: { attributes: [] }
                    }
                ]
            })

            if (!item) {
                throw new Error("404")
            }

            return item

        } catch (error) {
            return false
        }

    }

    static async criar(req: Request, res: Response) {

        try {

            const { nome, valor, data_que_foi_pago, tipo, relatorioId } = req.body;

            const relatorio = await RelatorioMes.findByPk(relatorioId);

            if (!relatorio) {
                const erro: erroCustom = {
                    codigo: 404,
                    message: "Valor vazio ou não existe"
                }
                throw erro;
            }

            const novoItem = await ItensTabela.create({
                nome,
                valor,
                data_que_foi_pago,
                tipo
            })

            const relacao = await (relatorio as any).addItensTabela(novoItem)

            if (!relacao) {
                const erro: erroCustom = {
                    codigo: 404,
                    message: "impossivel relacionar item a tabela"
                }
                novoItem.destroy()
                throw erro
            }

            res.status(201).json({ success: true, novoItem })

        } catch (error) {
            if (typeof error === "object") {
                const err = error as erroCustom
                res.status(err.codigo ?? 500).json({ message: err.message ?? "Erro ao criar item" })
            }
        }

    }

    static async editar(req: Request, res: Response) {

        try {

            const { relatorio_id } = req.params

            const { nome, valor, data_que_foi_pago, tipo, valorNovo } = req.body;

            type CamposItensTabela = "nome" | "valor" | "data_que_foi_pago" | "tipo";

            const { atributoMudar } = req.body as { atributoMudar: CamposItensTabela };

            const item = await this.acharItem(nome, valor, data_que_foi_pago, tipo, relatorio_id as string)

            if (!item) {
                const erro: erroCustom = {
                    codigo: 404,
                    message: "Item não existe"
                }
                throw erro
            }

            const itemAlterado = await item.update({
                [atributoMudar]: valorNovo
            })

            if (!itemAlterado) {
                const erro: erroCustom = {
                    codigo: 404,
                    message: "Impossivel de alterar o item"
                }
                throw erro
            }

            res.status(501).json({ success: true, itemAlterado })

        } catch (error) {
            if (typeof error === "object") {
                const err = error as erroCustom
                res.status(err.codigo ?? 500).json({ message: err.message ?? "Erro ao criar item" })
            }
        }

    }

    static async delete(req: Request, res: Response) {

        try {

            const { relatorio_id } = req.params

            const { nome, valor, data_que_foi_pago, tipo } = req.body;

            const item = await this.acharItem(nome, valor, data_que_foi_pago, tipo, relatorio_id as string)

            if(!item){
                const erro: erroCustom = {
                    codigo: 404,
                    message: "Item não existe"
                }
                throw erro
            }

            await item.destroy()

            res.status(501).json({success: true})

        } catch (error) {
            if (typeof error === "object") {
                const err = error as erroCustom
                res.status(err.codigo ?? 500).json({ message: err.message ?? "Erro ao criar item" })
            }
        }

    }

}