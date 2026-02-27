// src/controllers/usuarioController.ts
import { Request, Response } from "express";
import { RelatorioMes } from "../models/RelatorioMes";

export class RelatorioMesController {
    static async criar(req: Request, res: Response) {

        try {

            const novoRelatorio = await RelatorioMes.create({
                data: new Date().toISOString().split('T')[0]
            })

            res.status(201).json({ success: true, novoRelatorio })

        } catch (error) {
            res.status(500).json({message: "não foi possivel criar um relatório do mes"})
        }

    }
}
