import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categorias{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    NombreCategoria: string
}