//sales.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventas } from 'src/models/sales.model';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
    constructor(@InjectRepository(Ventas) private ventasRepository: Repository<Ventas>){
        
    }
    async getAllSales(): Promise<Ventas[]> {
        return await this.ventasRepository.find();
    }
    async getSalesDataId(id: number): Promise<Ventas>{
        const salesDoc = await this.ventasRepository.findOneBy({VentaID: id})
        if (!salesDoc) {
            throw new ConflictException('Venta no encontrado');
        }
        return salesDoc;
    }
    async getSalesDataByUserId(id: number): Promise<Ventas[]> {
        return await this.ventasRepository.find({ where: { UsuarioID: id } });
      }
    async deleteSalesId(id: number): Promise<void> {
        const sales = await this.ventasRepository.findOneBy({VentaID: id});
        if (!sales) {
          throw new ConflictException('Venta no encontrado');
        }
        await this.ventasRepository.remove(sales);
    }

    async createNewSales(newSales: Ventas): Promise<Ventas> {
      const lastSalesId = await this.ventasRepository
        .createQueryBuilder('ventas')
        .select('MAX(ventas.VentaID)', 'maxId')
        .getRawOne();
      const newSalesId = lastSalesId.maxId ? lastSalesId.maxId + 1 : 1;
      newSales.VentaID =  newSalesId;
      const sales = this.ventasRepository.create({
        VentaID: newSales.VentaID,
        FechaVenta: newSales.FechaVenta,
        UsuarioID: newSales.UsuarioID,
        TotalVenta: newSales.TotalVenta
      });
      
      await this.ventasRepository.save(sales);
      return sales;
    }
    async updateSalesData(id: number, updatedSales: Partial<Ventas>): Promise<Ventas> {
      const sales = await this.ventasRepository.findOneBy({VentaID: id});
      if (!sales) {
        throw new ConflictException('Ventas no encontrado');
      }
      if (updatedSales.FechaVenta) {
        sales.FechaVenta = updatedSales.FechaVenta;
      }
      if (updatedSales.UsuarioID) {
        sales.UsuarioID = updatedSales.UsuarioID;
      }
      if (updatedSales.TotalVenta) {
        sales.TotalVenta = updatedSales.TotalVenta;
      }
      await this.ventasRepository.save(sales);
      return sales;
    }
}
