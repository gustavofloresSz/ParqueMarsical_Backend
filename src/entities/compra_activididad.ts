import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Cliente } from "./cliente";
import { Actividades } from "./actividades";


@Entity()
export class Compra_Actividad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30,nullable: true })
    metodo_pago: string;

    @Column("int",{ nullable: true })
    cantidad: number;

    @CreateDateColumn()
    fecha: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.compraActividades)
    cliente: Cliente;

    @ManyToOne(() => Actividades, (actividad) => actividad.compraActividades)
    actividad: Actividades;
}
