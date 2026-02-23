import { Request, Response } from "express";
import { Entrada } from "../models/Entrada";
import { InferCreationAttributes } from "sequelize";

//ta usando o sequelize para criar um type pra eu poder fazer uma requisição igual no js
type criarAttributes = InferCreationAttributes<Entrada>;

export class EntradaController {
    static async criar(req: Request<{}, {}, criarAttributes>, res: Response) {

        try {

            const { nome, valor } = req.body;

            const novaEntrada = await Entrada.create({
                nome,
                valor
            })

            res.status(201).json({ success: true, novaEntrada })

        } catch (error) {
            res.status(500).json({ message: "Erro ao criar Entrada" })
        }

    }
}