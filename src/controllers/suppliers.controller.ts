//suppliers.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Categorias } from 'src/models/categories.model';
import { Proveedores } from 'src/models/suppliers.model';
import { SuppliersService } from 'src/services/suppliers.service';
@Controller()
export class SuppliersController {
constructor(private readonly suppliersService: SuppliersService) {}
@Get('/api/proveedor')
  async getAllSuppliers() { //obtener todos los datos de todos los proveedores
    const suppliers = await this.suppliersService.getAllSuppliers();
    return suppliers;
  } 
  @Get('/api/proveedor/:id') //obtener todos los datos del proveedor por el id
  async getSuppliersDataId(@Param('id') id: number) {
    const suppliers = await this.suppliersService.getSupplierDataId(id);
    return suppliers;
  }
  @Delete('/api/proveedor/:id') //borrar proveedor con el id
  async deleteSupplierId(@Param('id') id: number) {
    await this.suppliersService.deleteSupplierId(id);
    return { message: 'Proveedor eliminado con éxito' };
  }
  @Post('/api/proveedor') //anadir nuevos proveedores
  async registerNewSupplier(@Body() newSupplier : Proveedores) {
    const suppliers = await this.suppliersService.createNewSupplier(newSupplier);
    return { message: 'Proveedor agregado con éxito' };
  }
  @Put('/api/proveedor/:id') //buscar al proveedor por el id y luego actualizar el dato de un proveedor
  async updateSupplierData(@Param('id') id: number, @Body() updatedSupplierData: Proveedores) {
    const updatedSupplier = await this.suppliersService.updateSupplierData(id, updatedSupplierData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
