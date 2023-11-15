//transactions.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transacciones } from 'src/models/transactions.model';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
    constructor(@InjectRepository(Transacciones) private transaccionesRepository: Repository<Transacciones>){
        
    }
    async getAllTransactions(): Promise<Transacciones[]> {
        return await this.transaccionesRepository.find();
    }
    async getTransactionsDataId(id: number): Promise<Transacciones>{
        const transactionsDoc = await this.transaccionesRepository.findOneBy({TransaccionID: id})
        if (!transactionsDoc) {
            throw new ConflictException('Transaccion no encontrada');
        }
        return transactionsDoc;
    }
    async deleteTransactionsId(id: number): Promise<void> {
        const transactions = await this.transaccionesRepository.findOneBy({TransaccionID: id});
        if (!transactions) {
          throw new ConflictException('Transaccion no encontrada');
        }
        await this.transaccionesRepository.remove(transactions);
    }

    async createNewTransactions(newTransactions: Transacciones): Promise<Transacciones> {
      const lastTransactionId = await this.transaccionesRepository
        .createQueryBuilder('transacciones')
        .select('MAX(transacciones.TransaccionID)', 'maxId')
        .getRawOne();
      const newTransactionId = lastTransactionId.maxId ? lastTransactionId.maxId + 1 : 1;
      newTransactions.TransaccionID =  newTransactionId;
      const transactions = this.transaccionesRepository.create({
        TransaccionID: newTransactions.TransaccionID,
        FechaTransaccion: newTransactions.FechaTransaccion,
        Descripcion: newTransactions.Descripcion,
        Monto: newTransactions.Monto
      });
      await this.transaccionesRepository.save(transactions);
      return transactions;
    }
    async updateTransactionData(id: number, updatedTransaction: Partial<Transacciones>): Promise<Transacciones> {
      const transactions = await this.transaccionesRepository.findOneBy({TransaccionID: id});
      if (!transactions) {
        throw new ConflictException('Transaccion no encontrada');
      }
      if (updatedTransaction.FechaTransaccion) {
        transactions.FechaTransaccion = updatedTransaction.FechaTransaccion;
      }
      if (updatedTransaction.Descripcion) {
        transactions.Descripcion = updatedTransaction.Descripcion;
      }
      if (updatedTransaction.Monto) {
        transactions.Monto = updatedTransaction.Monto;
      }
      await this.transaccionesRepository.save(transactions);
      return transactions;
    }
}
