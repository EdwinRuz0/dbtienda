//suppliers.model.ts
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedores{
    @PrimaryGeneratedColumn()
    ProveedorID: number;
    @Column()
    NombreProveedor: string;
    @Column()
    ContactoProveedor: string;
    @Column()
    DireccionProveedor: string
}