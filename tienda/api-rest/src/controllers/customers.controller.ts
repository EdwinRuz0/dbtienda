//customers.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Clientes } from 'src/models/customers.model';
import { CustomersService } from 'src/services/customers.service';
@Controller()
export class CustomersController {
constructor(private readonly customersService: CustomersService) {}
@Get('/api/cliente')
  async getAllCustomers() { //obtener todos los datos de todos los clientes
    const customers = await this.customersService.getAllCustomers();
    return customers;
  } 
  @Get('/api/cliente/:id') //obtener todos los datos del cliente por el id
  async getCustomersDataId(@Param('id') id: number) {
    const customers = await this.customersService.getCustomersDataId(id);
    return customers;
  }
  @Delete('/api/cliente/:id') //borrar cliente con el id
  async deleteCustomersId(@Param('id') id: number) {
    await this.customersService.deleteCustomersId(id);
    return { message: 'Cliente eliminado con éxito' };
  }
  @Post('/api/cliente') //anadir nuevos clientes
  async registerNewCustomers(@Body() newCustomers : Clientes) {
    const customers = await this.customersService.createNewCustomers(newCustomers);
    return { message: 'Cliente agregado con éxito' };
  }
  @Put('/api/cliente/:id') //buscar al cliente por el id y luego actualizar el dato de un cliente
  async updateCustomersData(@Param('id') id: number, @Body() updatedCustomersData: Clientes) {
    const updatedCustomers = await this.customersService.updateCustomersData(id, updatedCustomersData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
