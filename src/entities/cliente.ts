import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { Compra } from "./compra";
import { Compra_Actividad } from "./compra_activididad";

@Entity()
export class Cliente extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ci: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 50 })
    apellido: string;

    @Column({ length: 20 })
    password: string;

    @OneToMany(() => Compra, (compra) => compra.cliente)
    compras: Compra[];

    @OneToMany(() => Compra_Actividad, (compraActividad) => compraActividad.cliente)
    compraActividades: Compra_Actividad[];
}
