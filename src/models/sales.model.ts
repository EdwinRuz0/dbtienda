//sales.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clientes } from "./customers.model";

@Entity()
export class Ventas {
  @PrimaryGeneratedColumn()
  VentaID: number;
  @Column()
  FechaVenta: Date;
  @ManyToOne(() => Clientes, (cliente) => cliente.ClienteID)
  @Column()
  ClienteID: number;
  @Column()
  TotalVenta: number;
}