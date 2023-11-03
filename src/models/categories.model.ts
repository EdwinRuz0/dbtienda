import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./products.model";

@Entity()
export class Categorias{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    NombreCategoria: string
    // @OneToMany(() => Productos, (producto) => producto.CategoriaID)
    // productos: Productos[];
}