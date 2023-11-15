//salesDetails.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DetallesVenta {
  @PrimaryGeneratedColumn()
  DetalleVentaID: number;
  @Column()
  VentaID: number;
  @Column()
  ProductoID: number;
  @Column()
  CantidadVendida: number;
  @Column()
  PrecioUnitario: number;
  @Column()
  Subtotal: number;
}