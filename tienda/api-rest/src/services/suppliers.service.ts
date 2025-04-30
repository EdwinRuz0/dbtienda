//suppliers.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedores } from 'src/models/suppliers.model';

@Injectable()
export class SuppliersService {
    constructor(@InjectRepository(Proveedores) private proveedoresRepository: Repository<Proveedores>){
        
    }
    async getAllSuppliers(): Promise<Proveedores[]> {
        return await this.proveedoresRepository.find();
    }
    async getSupplierDataId(id: number): Promise<Proveedores>{
        const suppliersDoc = await this.proveedoresRepository.findOneBy({ProveedorID: id})
        if (!suppliersDoc) {
            throw new ConflictException('Proveedor no encontrado');
        }
        return suppliersDoc;
    }
    async deleteSupplierId(id: number): Promise<void> {
        const suppliers = await this.proveedoresRepository.findOneBy({ProveedorID: id});
        if (!suppliers) {
          throw new ConflictException('Proveedor no encontrado');
        }
        await this.proveedoresRepository.remove(suppliers);
    }

    async createNewSupplier(newSupplier: Proveedores): Promise<Proveedores> {
      const lastSupplierId = await this.proveedoresRepository
        .createQueryBuilder('proveedores')
        .select('MAX(proveedores.ProveedorID)', 'maxId')
        .getRawOne();
      const newSupplierId = lastSupplierId.maxId ? lastSupplierId.maxId + 1 : 1;
      newSupplier.ProveedorID =  newSupplierId;
      const suppliers = this.proveedoresRepository.create({
        ProveedorID: newSupplier.ProveedorID,
        NombreProveedor: newSupplier.NombreProveedor,
        ContactoProveedor: newSupplier.ContactoProveedor,
        DireccionProveedor: newSupplier.DireccionProveedor,
        ImagenID: newSupplier.ImagenID || null,
      });
      await this.proveedoresRepository.save(suppliers);
      return suppliers;
    }
    async updateSupplierData(id: number, updatedSupplier: Partial<Proveedores>): Promise<Proveedores> {
      const suppliers = await this.proveedoresRepository.findOneBy({ProveedorID: id});
      if (!suppliers) {
        throw new ConflictException('Proveedor no encontrado');
      }
      if (updatedSupplier.NombreProveedor) {
        suppliers.NombreProveedor = updatedSupplier.NombreProveedor;
      }
      if (updatedSupplier.ContactoProveedor) {
        suppliers.ContactoProveedor = updatedSupplier.ContactoProveedor;
      }
      if (updatedSupplier.DireccionProveedor) {
        suppliers.DireccionProveedor = updatedSupplier.DireccionProveedor;
      }
      if (updatedSupplier.ImagenID !== undefined) {
        suppliers.ImagenID = updatedSupplier.ImagenID;
      }
      await this.proveedoresRepository.save(suppliers);
      return suppliers;
    }
}
