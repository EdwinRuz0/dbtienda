//sales.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ventas {
  @PrimaryGeneratedColumn()
  VentaID: number;
  @Column()
  FechaVenta: Date;
  @Column()
  ClienteID: number;
  @Column()
  TotalVenta: number;
}