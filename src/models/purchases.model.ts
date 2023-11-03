//purchases.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proveedores } from "./suppliers.model";

@Entity()
export class Compras {
  @PrimaryGeneratedColumn()
  CompraID: number;
  @Column()
  FechaCompra: Date;
  @ManyToOne(() => Proveedores, (proveedor) => proveedor.ProveedorID)
  @Column()
  ProveedorID: number;
  @Column()
  TotalCompra: number;
}