import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Compra } from "./compra";

@Entity()
export class Entrada extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    precio: number;

    @Column({ length: 20 })
    descripcion: string;

    @OneToMany(() => Compra, (compra) => compra.entrada)
    compra: Compra;
}
