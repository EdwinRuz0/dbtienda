//customels.models.ts
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clientes{
    @PrimaryGeneratedColumn()
    ClienteID: number;
    @Column()
    Nombre: string;
    @Column()
    Apellido: string;
    @Column({ nullable: true })
    Direccion: string;
    @Column({ nullable: true })
    Telefono: string;
    @Column({ nullable: true })
    CorreoElectronico: string
}