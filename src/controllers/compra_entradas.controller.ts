import { Request, Response } from "express";
import { getRepository, Raw } from "typeorm";
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

  //Reportes
  async getEntradasVendidasPorFecha(request: Request, response: Response) {
    const { fechaInicio, fechaFin } = request.query;
    try {
        const entradasVendidas = await Compra.find({
            where: {
                fecha: Raw(
                    (alias) => `DATE(${alias}) BETWEEN :fechaInicio AND :fechaFin`,
                    { fechaInicio, fechaFin }
                ),
            },
            relations: ['entrada', 'cliente'],
        });

        const resultados = entradasVendidas.map(compra => ({
            descripcion: compra.entrada.descripcion,
            nombreCliente: compra.cliente.nombre,
            ciCliente: compra.cliente.ci,
            cantidad: compra.cantidad,
        }));

        response.json(resultados);
    } catch (error) {
        console.error("Error al obtener el reporte de entradas:", error);
        response.status(500).json({ message: "Error al obtener el reporte de entradas" });
    }
  }
}