//purchasesDetails.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesCompra } from 'src/models/purchasesDetails.model';
import { Repository } from 'typeorm';

@Injectable()
export class PurchasesDetailsService {
    constructor(@InjectRepository(DetallesCompra) private detallesComprasRepository: Repository<DetallesCompra>){
        
    }
    async getAllPurchasesDetails(): Promise<DetallesCompra[]> {
        return await this.detallesComprasRepository.find();
    }
    async getPurchasesDetailsDataId(id: number): Promise<DetallesCompra>{
        const purchasesDetailsDoc = await this.detallesComprasRepository.findOneBy({DetalleCompraID: id})
        if (!purchasesDetailsDoc) {
            throw new ConflictException('Detalle de Compra no encontrado');
        }
        return purchasesDetailsDoc;
    }
    async deletePurchasesDetailsId(id: number): Promise<void> {
        const purchasesDetails = await this.detallesComprasRepository.findOneBy({DetalleCompraID: id});
        if (!purchasesDetails) {
          throw new ConflictException('Detalle de Compra no encontrado');
        }
        await this.detallesComprasRepository.remove(purchasesDetails);
    }

    async createNewPurchasesDetails(newPurchasesDetails: DetallesCompra): Promise<DetallesCompra> {
      const lastPurchasesDetailsId = await this.detallesComprasRepository
        .createQueryBuilder('detalleCompra')
        .select('MAX(detalleCompra.DetalleCompraID)', 'maxId')
        .getRawOne();
      const newPurchasesDetailsId = lastPurchasesDetailsId.maxId ? lastPurchasesDetailsId.maxId + 1 : 1;
      newPurchasesDetails.DetalleCompraID =  newPurchasesDetailsId;
      const purchasesDetails = this.detallesComprasRepository.create({
        DetalleCompraID: newPurchasesDetails.DetalleCompraID,
        CompraID: newPurchasesDetails.CompraID,
        ProductoID: newPurchasesDetails.ProductoID,
        CantidadComprada: newPurchasesDetails.CantidadComprada,
        PrecioUnitario: newPurchasesDetails.PrecioUnitario,
        Subtotal: newPurchasesDetails.Subtotal,
        FechaDetalle: newPurchasesDetails.FechaDetalle,
      });
      await this.detallesComprasRepository.save(purchasesDetails);
      return purchasesDetails;
    }
    async updatePurchasesDetailsData(id: number, updatedPurchasesDetails: Partial<DetallesCompra>): Promise<DetallesCompra> {
      const purchasesDetails = await this.detallesComprasRepository.findOneBy({DetalleCompraID: id});
      if (!PurchasesDetailsService) {
        throw new ConflictException('Detalle de Compra no encontrado');
      }
      if (updatedPurchasesDetails.CompraID) {
        purchasesDetails.CompraID = updatedPurchasesDetails.CompraID;
      }
      if (updatedPurchasesDetails.ProductoID) {
        purchasesDetails.ProductoID = updatedPurchasesDetails.ProductoID;
      }
      if (updatedPurchasesDetails.CantidadComprada) {
        purchasesDetails.CantidadComprada = updatedPurchasesDetails.CantidadComprada;
      }
      if (updatedPurchasesDetails.PrecioUnitario) {
        purchasesDetails.PrecioUnitario = updatedPurchasesDetails.PrecioUnitario;
      }
      if (updatedPurchasesDetails.Subtotal) {
        purchasesDetails.Subtotal = updatedPurchasesDetails.Subtotal;
      }
      if (updatedPurchasesDetails.FechaDetalle) {
        purchasesDetails.FechaDetalle = updatedPurchasesDetails.FechaDetalle;
      }
      await this.detallesComprasRepository.save(purchasesDetails);
      return purchasesDetails;
    }
}
