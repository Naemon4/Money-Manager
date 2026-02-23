// src/controllers/usuarioController.ts
import { Request, Response } from "express";
import { RelatorioMes } from "../models/RelatorioMes";

export class RelatorioMesController {
    static async criar(req: Request, res:Response) {

        const novoRelatorio = await RelatorioMes.create({
            data: new Date().toISOString().split('T')[0]
        })

        res.json({success: true, novoRelatorio})

    }
}
