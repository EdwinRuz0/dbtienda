//purchases.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compras {
  @PrimaryGeneratedColumn()
  CompraID: number;
  @Column()
  FechaCompra: Date;
  @Column()
  ProveedorID: number;
  @Column()
  TotalCompra: number;
}