//purchases.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compras } from 'src/models/purchases.model';
import { Repository } from 'typeorm';

@Injectable()
export class PurchasesService {
    constructor(@InjectRepository(Compras) private comprasRepository: Repository<Compras>){
        
    }
    async getAllPurchases(): Promise<Compras[]> {
        return await this.comprasRepository.find();
    }
    async getPurchasesDataId(id: number): Promise<Compras>{
        const purchasesDoc = await this.comprasRepository.findOneBy({CompraID: id})
        if (!purchasesDoc) {
            throw new ConflictException('Compra no encontrado');
        }
        return purchasesDoc;
    }
    async deletePurchasesId(id: number): Promise<void> {
        const purchases = await this.comprasRepository.findOneBy({CompraID: id});
        if (!purchases) {
          throw new ConflictException('Compra no encontrado');
        }
        await this.comprasRepository.remove(purchases);
    }

    async createNewPurchases(newPurchases: Compras): Promise<Compras> {
      const lastPurchasesId = await this.comprasRepository
        .createQueryBuilder('compra')
        .select('MAX(compra.CompraID)', 'maxId')
        .getRawOne();
      const newPurchasesId = lastPurchasesId.maxId ? lastPurchasesId.maxId + 1 : 1;
      newPurchases.CompraID =  newPurchasesId;
      const purchases = this.comprasRepository.create({
        CompraID: newPurchases.CompraID,
        FechaCompra: newPurchases.FechaCompra,
        ProveedorID: newPurchases.ProveedorID,
        TotalCompra: newPurchases.TotalCompra
      });
      await this.comprasRepository.save(purchases);
      return purchases;
    }
    async updatePurchasesData(id: number, updatedPurchases: Partial<Compras>): Promise<Compras> {
      const purchases = await this.comprasRepository.findOneBy({CompraID: id});
      if (!purchases) {
        throw new ConflictException('Compra no encontrado');
      }
      if (updatedPurchases.FechaCompra) {
        purchases.FechaCompra = updatedPurchases.FechaCompra;
      }
      if (updatedPurchases.ProveedorID) {
        purchases.ProveedorID = updatedPurchases.ProveedorID;
      }
      if (updatedPurchases.TotalCompra) {
        purchases.TotalCompra = updatedPurchases.TotalCompra;
      }
      await this.comprasRepository.save(purchases);
      return purchases;
    }
}
