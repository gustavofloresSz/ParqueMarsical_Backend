import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
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

    @ManyToOne(() => Cliente, (cliente) => cliente.compras)
    cliente: Cliente;

    @OneToMany(() => Entrada, (entrada) => entrada.compra)
    entradas: Entrada[];
}
