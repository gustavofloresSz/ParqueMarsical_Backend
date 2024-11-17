import { Between, Raw } from "typeorm";
import { Actividades, Compra, Compra_Actividad } from "../entities";
import { Request, Response } from "express";

export class IngresosController{
    async getGananciasEntrada(request: Request, response: Response) {
        const { fechaInicio, fechaFin } = request.query;
        try {
            const compras = await Compra.find({
            relations: ["entrada"],
            where: {
                fecha: Raw(
                (alias) => `DATE(${alias}) BETWEEN :fechaInicio AND :fechaFin`,
                { fechaInicio, fechaFin }
                ),
            },
            });
            const gananciasPorEntrada: { [key: string]: { cantidad: number; ingreso: number } } = {};
            let totalGanancias = 0;
    
            compras.forEach((compra) => {
                const entrada = compra.entrada;
                const cantidad = compra.cantidad;
                const ingreso = entrada.precio * cantidad;
    
                if (gananciasPorEntrada[entrada.descripcion]) {
                    gananciasPorEntrada[entrada.descripcion].cantidad += cantidad;
                    gananciasPorEntrada[entrada.descripcion].ingreso += ingreso;
                } else {
                    gananciasPorEntrada[entrada.descripcion] = {
                        cantidad: cantidad,
                        ingreso: ingreso,
                    };
                }
    
                totalGanancias += ingreso;
            });
            console.log(totalGanancias)
            console.log('Compras:', compras);
    
            const gananciasArray = Object.keys(gananciasPorEntrada).map(descripcion => ({
                descripcion,
                cantidad: gananciasPorEntrada[descripcion].cantidad,
                ingreso: gananciasPorEntrada[descripcion].ingreso,
            }));
    
            response.json({ gananciasPorEntrada: gananciasArray, totalGanancias });
        } catch (error) {
            console.error("Error al obtener las ganancias:", error);
            response.status(500).json({ message: "Error al obtener las ganancias" });
        }
    }

    async getGananciasActividades(request: Request, response: Response) {
        const { fechaInicio, fechaFin } = request.query;
        try {
            const compra_actividad = await Compra_Actividad.find({
                relations: ["actividad"],
                where: {
                    fecha: Raw(
                        (alias) => `DATE(${alias}) BETWEEN :fechaInicio AND :fechaFin`,
                        { fechaInicio, fechaFin }
                    ),
                },
            });
            const gananciasPorActividad: { [key: string]: { cantidad: number; ingreso: number } } = {};
            let totalGananciasActivities = 0;
    
            compra_actividad.forEach((compra) => {
                const actividad = compra.actividad;
                const cantidad = compra.cantidad;
                const ingreso = actividad.precio * cantidad;
    
                if (!gananciasPorActividad[actividad.nombre]) {
                    gananciasPorActividad[actividad.nombre] = { cantidad: 0, ingreso: 0 };
                }
    
                gananciasPorActividad[actividad.nombre].cantidad += cantidad;
                gananciasPorActividad[actividad.nombre].ingreso += ingreso;
                totalGananciasActivities += ingreso;
            });
    
            const gananciasArray = Object.keys(gananciasPorActividad).map(nombre => ({
                nombre,
                cantidad: gananciasPorActividad[nombre].cantidad,
                ingreso: gananciasPorActividad[nombre].ingreso,
            }));
    
            response.json({ totalGananciasActivities, gananciasPorActividad: gananciasArray });
        } catch (error) {
            console.error("Error al obtener las ganancias de actividades:", error);
            response.status(500).json({ message: "Error al obtener las ganancias de actividades" });
        }
    }

    //actividad mas vendida
    async getActividadMasVendida(request: Request, response: Response) {
        const { fechaInicio, fechaFin } = request.query;
        try {
            const comprasActividades = await Compra_Actividad.find({
                relations: ["actividad"],
                where: {
                    fecha: Raw(
                        (alias) => `DATE(${alias}) BETWEEN :fechaInicio AND :fechaFin`,
                        { fechaInicio, fechaFin }
                    ),
                },
            });
    
            const actividadContada: { [key: number]: number } = {};
            comprasActividades.forEach(compra => {
                const actividadId = compra.actividad.id;
                const cantidad = compra.cantidad;
    
                if (actividadContada[actividadId]) {
                    actividadContada[actividadId] += cantidad;
                } else {
                    actividadContada[actividadId] = cantidad;
                }
            });
            const actividadesConCantidades = Object.keys(actividadContada)
                .map(id => ({ id: parseInt(id), cantidad: actividadContada[parseInt(id)] }))
                .sort((a, b) => b.cantidad - a.cantidad);
    
            const actividadesDetalles = await Promise.all(actividadesConCantidades.map(async (actividad) => {
                const detalle = await Actividades.findOne({ where: { id: actividad.id } });
                return { ...detalle, cantidad: actividad.cantidad };
            }));
    
            response.json({ actividades: actividadesDetalles });
    
        } catch (error) {
            console.error("Error al obtener las actividades:", error);
            response.status(500).json({ message: "Error al obtener las actividades" });
        }
    }
}