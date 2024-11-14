import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Administrador } from "./administrador";
import { Compra_Actividad } from "./compra_activididad";

@Entity()
export class Actividades extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  nombre: string;

  @Column({ length: 200 })
  descripcion: string;

  @Column({ nullable: true })
  imagen: string;

  @Column("float")
  precio: number;

  @OneToMany(() => Compra_Actividad, (compraActividad) => compraActividad.actividad)
  compraActividades: Compra_Actividad[];
}
