//suppliers.model.ts
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./products.model";

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