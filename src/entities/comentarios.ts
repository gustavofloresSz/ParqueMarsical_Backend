import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    opinion: string;

    @Column({ length: 50 })
    clasificacion: string;
}