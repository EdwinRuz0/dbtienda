//purchases.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Compras } from 'src/models/purchases.model';
import { PurchasesService } from 'src/services/purchases.service';
@Controller()
export class PurchasesController {
constructor(private readonly purchasesService: PurchasesService) {}
@Get('/api/compra')
  async getAllPurchases() { //obtener todos los datos de todas las compras
    const purchases = await this.purchasesService.getAllPurchases();
    return purchases;
  } 
  @Get('/api/compra/:id') //obtener todos los datos de la compra por el id
  async getPurchasesDataId(@Param('id') id: number) {
    const purchases = await this.purchasesService.getPurchasesDataId(id);
    return purchases;
  }
  @Delete('/api/compra/:id') //borrar compra con el id
  async deletePurchasesId(@Param('id') id: number) {
    await this.purchasesService.deletePurchasesId(id);
    return { message: 'Compra eliminada con éxito' };
  }
  @Post('/api/compra') //anadir nueva compra
  async registerNewPurchases(@Body() newPurchases : Compras) {
    const purchases = await this.purchasesService.createNewPurchases(newPurchases);
    return { message: 'Compra agregada con éxito' };
  }
  @Put('/api/compra/:id') //buscar a la compra por el id y luego actualizar el dato de un proveedor
  async updatePurchasesData(@Param('id') id: number, @Body() updatedPurchasesData: Compras) {
    const updatedPurchases = await this.purchasesService.updatePurchasesData(id, updatedPurchasesData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
