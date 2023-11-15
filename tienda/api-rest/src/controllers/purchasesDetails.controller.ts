//purchasesDetails.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { DetallesCompra } from 'src/models/purchasesDetails.model';
import { PurchasesDetailsService } from 'src/services/purchasesDetails.service';
@Controller()
export class PurchasesDetailsController {
constructor(private readonly purchasesDetailsService: PurchasesDetailsService) {}
@Get('/api/Detallescompra')
  async getAllPurchasesDetails() { //obtener todos los datos de todas las detalles de compras
    const purchasesDetails = await this.purchasesDetailsService.getAllPurchasesDetails();
    return purchasesDetails;
  } 
  @Get('/api/Detallescompra/:id') //obtener todos los datos de la detalle de compra por el id
  async getPurchasesDetailsDataId(@Param('id') id: number) {
    const purchasesDetails = await this.purchasesDetailsService.getPurchasesDetailsDataId(id);
    return purchasesDetails;
  }
  @Delete('/api/Detallescompra/:id') //borrar detalle de compra con el id
  async deletePurchasesDetailsId(@Param('id') id: number) {
    await this.purchasesDetailsService.deletePurchasesDetailsId(id);
    return { message: 'Detalle de Compra eliminada con éxito' };
  }
  @Post('/api/Detallescompra') //anadir nueva detalle de compra
  async registerNewPurchasesDetails(@Body() newPurchasesDetails : DetallesCompra) {
    const purchasesDetails = await this.purchasesDetailsService.createNewPurchasesDetails(newPurchasesDetails);
    return { message: 'Detalle de Compra agregada con éxito' };
  }
  @Put('/api/Detallescompra/:id') //buscar a la detalle de compra por el id y luego actualizar el dato de un detalle de compra
  async updatePurchasesDetailsData(@Param('id') id: number, @Body() updatedPurchasesDetailsData: DetallesCompra) {
    const updatedPurchasesDetails = await this.purchasesDetailsService.updatePurchasesDetailsData(id, updatedPurchasesDetailsData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
