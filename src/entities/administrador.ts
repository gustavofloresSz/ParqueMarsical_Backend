import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { Compra } from "./compra";
import { Actividades } from "./actividades";

@Entity()
export class Administrador extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 50 })
    apellido: string;

    @Column({ length: 50 })
    usuario: string;

    @Column({ length: 20 })
    password: string;

    @OneToMany(() => Actividades, (actividades) => actividades.administrador)
    actividades: Actividades[];
}
