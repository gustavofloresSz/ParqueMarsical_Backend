import { DataSource } from "typeorm";
import { Cliente } from "./entities/cliente";
import { Compra } from "./entities/compra";
import { Entrada } from "./entities/entrada";
import { Actividades } from "./entities/actividades";
import { Administrador } from "./entities/administrador";
import { Compra_Actividad } from "./entities/compra_activididad";
import { Comentario } from "./entities/comentarios";

//conexion con la BD MySQL
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234root",
    database: "venta_entradas",
    synchronize: true,
    entities:[Cliente,Compra,Entrada,Actividades,Administrador,Compra_Actividad,Comentario]
})

//conexion con la BD Postgres
// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "1234root",
//     database: "Parque_mariscal",
//     synchronize: true,
//     entities:[Cliente,Compra,Entrada,Actividades,Administrador,Compra_Actividad]
//  })