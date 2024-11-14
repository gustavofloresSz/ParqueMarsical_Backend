import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Compra, Entrada } from "../entities";

export class CompraEntradasController {
    //metodo agregar usuarios
  async add_compra(request: Request, response: Response) {
    const { metodo_pago, cliente_id, cantidad, entradaId} = request.body;
    const compra = Compra.create({ metodo_pago, cliente:cliente_id, cantidad ,entrada:entradaId});
    console.log(request.body)
    await compra.save();
    return response
      .status(200)
  }
}
