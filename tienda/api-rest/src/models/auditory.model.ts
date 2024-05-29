//categories.model.ts
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auditoria{
    @PrimaryGeneratedColumn()
    AuditoriaID: number;
    @Column()
    NombreTabla: string;
    @Column()
    Operacion:string;
    @Column()
    Usuario:string;
    @Column()
    FechaHora:string;
    @Column()
    DatosAnteriores:string;
    @Column()
    DatosNuevos:string;
}