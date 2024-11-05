import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./cliente";
import { Actividades } from "./actividades";


@Entity()
export class Compra_Actividad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    metodo_pago: string;

    @Column("int")
    cantidad: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.compraActividades)
    cliente: Cliente;

    @OneToMany(() => Actividades, (actividad) => actividad.compraActividades)
    actividad: Actividades;
}
