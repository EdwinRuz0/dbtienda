//temporaryCart.model.ts
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('CarritoTemporal')
export class CarritoTemporal{
    @PrimaryGeneratedColumn()
    CarritoID: number;
    @Column()
    UsuarioID: number;
    @Column()
    ProductoID: number;
    @Column()
    Cantidad: number
    @Column()
    FechaAgregado: Date;
}