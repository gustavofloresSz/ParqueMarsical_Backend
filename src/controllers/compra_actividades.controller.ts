import { Request, Response } from "express";
import { Actividades, Compra_Actividad } from "../entities";
import { Raw } from "typeorm";

export class ActividadesController {
  //metodo agregar actividades
  async add_actividades(request: Request, response: Response) {
    const {nombre, descripcion,compraActividadesId,precio } = request.body;
    console.log(request.body)
    const actividad = new Actividades()
    actividad.nombre = nombre
    actividad.descripcion = descripcion
    actividad.compraActividades = compraActividadesId
    actividad.precio = precio
    await actividad.save();
  }

  async add_compra_actividad(request: Request, response: Response) {
    const actividades = request.body;
  
    if (!Array.isArray(actividades)) {
      return response.status(400).json({ error: 'Se esperaba un arreglo de actividades' });
    } 
    try {
      // Iterar sobre cada actividad en el arreglo
      for (const actividad of actividades) {
        const { cantidad, cliente_id, metodo_pago, actividadId } = actividad;
        console.log(request.body)
        const compra_actividad = Compra_Actividad.create({
          cantidad,
          cliente: cliente_id,
          metodo_pago,
          actividad: actividadId
        });
        
        await compra_actividad.save();
      }
      return response.status(200).json({ message: 'Compra de actividades registrada exitosamente' });
  
    } catch (error) {
      console.error('Error al registrar actividades:', error);
      return response.status(500).json({ error: 'Error al registrar actividades' });
    }
  }

  async getActividadesVendidasPorFecha(request: Request, response: Response) {
    const { fechaInicio, fechaFin } = request.query;
    try {
        const actividadesVendidas = await Compra_Actividad.find({
            where: {
                fecha: Raw(
                    (alias) => `DATE(${alias}) BETWEEN :fechaInicio AND :fechaFin`,
                    { fechaInicio, fechaFin }
                ),
            },
            relations: ['actividad', 'cliente'], //la relacion aca, es como un join
        });

        const resultados = actividadesVendidas.map(compra => ({
            nombreActividad: compra.actividad.nombre,
            nombreCliente: compra.cliente.nombre,
            ciCliente: compra.cliente.ci,
            cantidad: compra.cantidad,
        }));

        response.json(resultados);
    } catch (error) {
        console.error("Error al obtener el reporte de actividades:", error);
        response.status(500).json({ message: "Error al obtener el reporte de actividades" });
    }
  }
}