//salesDetails.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesVenta } from 'src/models/salesDetails.model';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsSalesService {
    constructor(@InjectRepository(DetallesVenta) private detallesVentasRepository: Repository<DetallesVenta>){
    }
    async getAllDetailsSales(): Promise<DetallesVenta[]> {
        return await this.detallesVentasRepository.find();
    }
    async getDetailsSalesDataId(id: number): Promise<DetallesVenta>{
        const detailsDoc = await this.detallesVentasRepository.findOneBy({DetalleVentaID: id})
        if (!detailsDoc) {
            throw new ConflictException('Detalle de ventas no encontrada');
        }
        return detailsDoc;
    }
    async getDetailsSalesDataByVentaId(id: number): Promise<DetallesVenta[]> {
            return await this.detallesVentasRepository.find({ where: { VentaID: id } });
          }
    async deleteDetailsSalesId(id: number): Promise<void> {
        const details = await this.detallesVentasRepository.findOneBy({DetalleVentaID: id});
        if (!details) {
          throw new ConflictException('Detalle de venta no encontrado');
        }
        await this.detallesVentasRepository.remove(details);
    }

    async createNewDetailsSales(newDetails: DetallesVenta): Promise<DetallesVenta> {
      const details = this.detallesVentasRepository.create({
        VentaID: newDetails.VentaID,
        ProductoID: newDetails.ProductoID,
        CantidadVendida: newDetails.CantidadVendida,
        PrecioUnitario: newDetails.PrecioUnitario,
        Subtotal: newDetails.Subtotal,
        FechaDetalle: newDetails.FechaDetalle,
      });
      await this.detallesVentasRepository.save(details);
      return details;
    }
    
    async updateDetailsSalesData(id: number, updatedDetailsSales: Partial<DetallesVenta>): Promise<DetallesVenta> {
      const details = await this.detallesVentasRepository.findOneBy({DetalleVentaID: id});
      if (!details) {
        throw new ConflictException('Detalles no encontrado');
      }
      if (updatedDetailsSales.VentaID) {
        details.VentaID = updatedDetailsSales.VentaID;
      }
      if (updatedDetailsSales.ProductoID) {
        details.ProductoID = updatedDetailsSales.ProductoID;
      }
      if (updatedDetailsSales.CantidadVendida) {
        details.CantidadVendida = updatedDetailsSales.CantidadVendida;
      }
      if (updatedDetailsSales.PrecioUnitario) {
        details.PrecioUnitario = updatedDetailsSales.PrecioUnitario;
      }
      if (updatedDetailsSales.Subtotal) {
        details.Subtotal = updatedDetailsSales.Subtotal;
      }
      if (updatedDetailsSales.FechaDetalle) {
        details.FechaDetalle = updatedDetailsSales.FechaDetalle;
      }
      await this.detallesVentasRepository.save(details);
      return details;
    }
}
