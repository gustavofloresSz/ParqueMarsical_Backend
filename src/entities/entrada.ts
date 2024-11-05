import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Compra } from "./compra";

@Entity()
export class Entrada extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    precio: number;

    @Column("date")
    fecha: Date;

    @ManyToOne(() => Compra, (compra) => compra.entradas)
    compra: Compra;
}
