//transactions.model.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transacciones {
  @PrimaryGeneratedColumn()
  TransaccionID: number;
  @Column()
  FechaTransaccion: Date;
  @Column({ nullable: true })
  Descripcion: string;
  @Column()
  Monto: number;
}