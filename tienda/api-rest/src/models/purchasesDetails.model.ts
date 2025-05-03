//purchasesDetails.model.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DetallesCompra {
  @PrimaryGeneratedColumn()
  DetalleCompraID: number;
  @Column()
  CompraID: number;
  @Column()
  ProductoID: number;
  @Column()
  CantidadComprada: number;
  @Column()
  PrecioUnitario: number;
  @Column()
  Subtotal: number;
  @Column()
  FechaDetalle: Date;
}