//transactions.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Transacciones } from 'src/models/transactions.model';
import { TransactionsService } from 'src/services/transactions.service';
@Controller()
export class TransactionsController {
constructor(private readonly transactionsService: TransactionsService) {}
@Get('/api/transaccion')
  async getAllTransactions() { //obtener todos los datos de todos las transacciones
    const transactions = await this.transactionsService.getAllTransactions();
    return transactions;
  } 
  @Get('/api/transaccion/:id') //obtener todos los datos de las transacciones por el id
  async getTransactionDataId(@Param('id') id: number) {
    const transactions = await this.transactionsService.getTransactionsDataId(id);
    return transactions;
  }
  @Delete('/api/transaccion/:id') //borrar transacciones con el id
  async deleteTransactionId(@Param('id') id: number) {
    await this.transactionsService.deleteTransactionsId(id);
    return { message: 'Transaccion eliminada con éxito' };
  }
  @Post('/api/transaccion') //anadir nuevas transacciones
  async registerNewTransaction(@Body() newTransactions : Transacciones) {
    const transactions = await this.transactionsService.createNewTransactions(newTransactions);
    return { message: 'Transaccion agregada con éxito' };
  }
  @Put('/api/transaccion/:id') //buscar a la transaccion por el id y luego actualizar el dato de una transaccion
  async updateTransactionData(@Param('id') id: number, @Body() updatedTransactionData: Transacciones) {
    const updatedTransaction = await this.transactionsService.updateTransactionData(id, updatedTransactionData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
