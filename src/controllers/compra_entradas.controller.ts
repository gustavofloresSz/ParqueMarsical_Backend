import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Compra, Entrada } from "../entities";

export class CompraEntradasController {
    //metodo agregar usuarios
  async add_compra(request: Request, response: Response) {
    const { metodo_pago, cliente_id, cantidad } = request.body;
    const compra = Compra.create({ metodo_pago, cliente:cliente_id, cantidad });
    console.log(request.body)
    await compra.save();
    return response
      .status(200)
  }


    // Método para agregar compra y registrar la entrada
    // async add_compra(request: Request, response: Response) {
    //     const { metodo_pago, cliente_id, cantidad, precio_total } = request.body;

    //     try {
    //         // 1. Crear y guardar la compra
    //         const compraRepository = getRepository(Compra);
    //         const compra = compraRepository.create({
    //             metodo_pago: metodo_pago,
    //             cliente: cliente_id,
    //             cantidad: cantidad,
    //         });
    //         await compraRepository.save(compra);

    //         // 2. Crear y guardar la entrada asociada a esta compra
    //         const entradaRepository = getRepository(Entrada);
    //         const entrada = entradaRepository.create({
    //             precio: precio_total,
    //             fecha: new Date(), // Fecha actual
    //             compra: compra, // Referencia al objeto completo de compra
    //         });
    //         await entradaRepository.save(entrada);

    //         return response.status(201).json({ message: "Compra y entrada registradas correctamente" });
    //     } catch (error) {
    //         console.error("Error al registrar compra y entrada:", error);
    //         return response.status(500).json({ message: "Error al registrar compra y entrada" });
    //     }
    // }
}
