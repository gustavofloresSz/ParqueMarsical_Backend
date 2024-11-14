import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Cliente } from "./cliente";
import { Administrador } from "./administrador";
import { Entrada } from "./entrada";
import { Actividades } from "./actividades";

@Entity()
export class Compra extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    metodo_pago: string;

    @Column("int")
    cantidad: number;

    @CreateDateColumn()
    fecha: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.compras)
    cliente: Cliente;

    @ManyToOne(() => Entrada, (entrada) => entrada.compra)
    entrada: Entrada[];
}
