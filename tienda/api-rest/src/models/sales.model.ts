//sales.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ventas {
  @PrimaryGeneratedColumn()
  VentaID: number;
  @Column()
  FechaVenta: Date;
  @Column()
  UsuarioID: number;
  @Column()
  TotalVenta: number;
}