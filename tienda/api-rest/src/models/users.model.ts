import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuarios{
    @PrimaryGeneratedColumn()
    UsuarioID: number;
    @Column()
    UserName: string;
    @Column()
    Password: string;
    @Column()
    Rol: string
}