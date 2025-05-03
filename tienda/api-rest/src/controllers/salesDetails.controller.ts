//salesDetails.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { DetallesVenta } from 'src/models/salesDetails.model';
import { DetailsSalesService } from 'src/services/salesDetails.service';
@Controller()
export class DetailsSalesController {
constructor(private readonly detallesVentasService: DetailsSalesService) {}
  @Get('/api/detallesVenta')
  async getAllDetailsSales() { //obtener todos los datos de todos las detalles de ventas
    const sales = await this.detallesVentasService.getAllDetailsSales();
    return sales;
  } 
  @Get('/api/detallesVenta/:id') //obtener todos los datos de las detalles de ventas por el id
  async getDetailsSalesDataId(@Param('id') id: number) {
    const sales = await this.detallesVentasService.getDetailsSalesDataId(id);
    return sales;
  }
  @Get('/api/detallesVenta/venta/:id')
  async getDetailsSalesDataByVentaId(@Param('id') id: number) { 
    return await this.detallesVentasService.getDetailsSalesDataByVentaId(id);
  }
  @Delete('/api/detallesVenta/:id') //borrar las detalles de ventas con el id
  async deleteDetaisSalesId(@Param('id') id: number) {
    await this.detallesVentasService.deleteDetailsSalesId(id);
    return { message: 'Detalle de Venta eliminado con éxito' };
  }
  @Post('/api/detallesVenta') //anadir nuevas detalles de ventas
  async registerNewDetailsSales(@Body() newSales : DetallesVenta) {
    const sales = await this.detallesVentasService.createNewDetailsSales(newSales);
    return { message: 'Detalle de Ventas agregado con éxito' };
  }
  @Put('/api/detallesVenta/:id') //buscar a la detalle de venta por el id y luego actualizar el dato de una detalle de venta
  async updateDetailsSalesData(@Param('id') id: number, @Body() updatedDetailsSalesData: DetallesVenta) {
    const updatedSales = await this.detallesVentasService.updateDetailsSalesData(id, updatedDetailsSalesData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
