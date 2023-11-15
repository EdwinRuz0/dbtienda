//sales.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Ventas } from 'src/models/sales.model';
import { SalesService } from 'src/services/sales.service';
@Controller()
export class SalesController {
constructor(private readonly ventasService: SalesService) {}
  @Get('/api/venta')
  async getAllSales() { //obtener todos los datos de todos las ventas
    const sales = await this.ventasService.getAllSales();
    return sales;
  } 
  @Get('/api/venta/:id') //obtener todos los datos de las ventas por el id
  async getSalesDataId(@Param('id') id: number) {
    const sales = await this.ventasService.getSalesDataId(id);
    return sales;
  }
  @Delete('/api/venta/:id') //borrar las ventas con el id
  async deleteSalesId(@Param('id') id: number) {
    await this.ventasService.deleteSalesId(id);
    return { message: 'Venta eliminado con éxito' };
  }
  @Post('/api/venta') //anadir nuevas ventas
  async registerNewSales(@Body() newSales : Ventas) {
    const sales = await this.ventasService.createNewSales(newSales);
    return { message: 'Ventas agregado con éxito' };
  }
  @Put('/api/venta/:id') //buscar a la venta por el id y luego actualizar el dato de una venta
  async updateSalesData(@Param('id') id: number, @Body() updatedSalesData: Ventas) {
    const updatedSales = await this.ventasService.updateSalesData(id, updatedSalesData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
