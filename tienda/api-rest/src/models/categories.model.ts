//categories.model.ts
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categorias{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    NombreCategoria: string;
    @Column({ nullable: false })
    Descripcion:string;
    @Column({ nullable: false })
    ImagenID: number;
}