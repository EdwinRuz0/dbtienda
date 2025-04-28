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
    @Column({ nullable: true })
    ImagenID: number;
    @Column()
    PrimerApellido: string;
    @Column()
    SegundoApellido: string;
    @Column()
    Direccion: string;
    @Column()
    Telefono: string;
    @Column()
    CorreoElectronico: string;
}