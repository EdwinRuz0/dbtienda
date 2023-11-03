//salesDetails.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ventas } from "./sales.model";
import { Productos } from "./products.model";

@Entity()
export class DetallesVenta {
  @PrimaryGeneratedColumn()
  DetalleVentaID: number;
  @ManyToOne(() => Ventas, (venta) => venta.VentaID)
  @Column()
  VentaID: number;
  @ManyToOne(() => Productos, (producto) => producto.ProductoID)
  @Column()
  ProductoID: number;
  @Column()
  CantidadVendida: number;
  @Column()
  PrecioUnitario: number;
  @Column()
  Subtotal: number;
}