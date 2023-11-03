//purchasesDetails.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Compras } from "./purchases.model";
import { Productos } from "./products.model";

@Entity()
export class DetallesCompra {
  @PrimaryGeneratedColumn()
  DetalleCompraID: number;
  @ManyToOne(() => Compras, (compra) => compra.CompraID)
  @Column()
  CompraID: number;
  @ManyToOne(() => Productos, (producto) => producto.ProductoID)
  @Column()
  ProductoID: number;
  @Column()
  CantidadComprada: number;
  @Column()
  PrecioUnitario: number;
  @Column()
  Subtotal: number;
}