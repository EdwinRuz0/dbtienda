//products.model.ts
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Productos{
    @PrimaryGeneratedColumn()
    ProductoID: number;
    @Column()
    NombreProducto: string;
    @Column({ nullable: true })
    Descripcion: string;
    @Column()
    Precio: number;
    @Column()
    CantidadEnStock: number;
    @Column()
    CategoriaID: number;
    @Column()
    ProveedorID: number;

}