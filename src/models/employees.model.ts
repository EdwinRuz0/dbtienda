//employees.model.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleados {
  @PrimaryGeneratedColumn()
  EmpleadoID: number;
  @Column()
  Nombre: string;
  @Column()
  Apellido: string;
  @Column({ nullable: true })
  Puesto: string;
  @Column({ nullable: true })
  FechaInicio: Date;
  @Column({ nullable: true })
  Salario: number;
}