//products.model.ts
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proveedores } from "./suppliers.model";
import { Categorias } from "./categories.model";

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
    // @ManyToOne(() => Categorias, (categoria) => categoria.id)
    @Column()
    CategoriaID: number;
    // @ManyToOne(() => Proveedores, (proveedor) => proveedor.ProveedorID)
    @Column()
    ProveedorID: number;

}