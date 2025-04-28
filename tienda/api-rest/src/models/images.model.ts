// src/models/imagen.model.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Imagenes')
export class Imagen {
  @PrimaryGeneratedColumn()
  ImagenID: number;

  @Column()
  NombreImagen: string;

  @Column()
  Extension: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  DataBase64: string;

  @Column({ nullable: true })
  Referencia: string; // Ejemplo: "producto", "categoria", "proveedor", "usuario"
}
