import { Request, Response } from "express";
import { Actividades } from "../entities";

export class ActividadesController {
  async get_actividades(response: Response) {
    const actividad = await Actividades.find();
    response.json(actividad);
  }

  //metodo agregar actividades
  async add_actividades(request: Request, response: Response) {
    const {nombre, descripcion,administradorId,compraActividadesId,precio } = request.body;
    console.log(request.body)
    const actividad = new Actividades()
    actividad.nombre = nombre
    actividad.descripcion = descripcion
    actividad.administrador = administradorId
    actividad.compraActividades = compraActividadesId
    actividad.precio = precio
    await actividad.save();
  }

}
