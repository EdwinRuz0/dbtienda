//customers.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientes } from 'src/models/customers.model';

@Injectable()
export class CustomersService {
    constructor(@InjectRepository(Clientes) private clientesRepository: Repository<Clientes>){
        
    }
    async getAllCustomers(): Promise<Clientes[]> {
        return await this.clientesRepository.find();
    }
    async getCustomersDataId(id: number): Promise<Clientes>{
        const customersDoc = await this.clientesRepository.findOneBy({ClienteID: id})
        if (!customersDoc) {
            throw new ConflictException('Cliente no encontrado');
        }
        return customersDoc;
    }
    async deleteCustomersId(id: number): Promise<void> {
        const customers = await this.clientesRepository.findOneBy({ClienteID: id});
        if (!customers) {
          throw new ConflictException('Cliente no encontrado');
        }
        await this.clientesRepository.remove(customers);
    }

    async createNewCustomers(newCustomers: Clientes): Promise<Clientes> {
      const lastCustomersId = await this.clientesRepository
        .createQueryBuilder('clientes')
        .select('MAX(clientes.ClienteID)', 'maxId')
        .getRawOne();
      const newCustomersId = lastCustomersId.maxId ? lastCustomersId.maxId + 1 : 1;
      newCustomers.ClienteID =  newCustomersId;
      const customers = this.clientesRepository.create({
        ClienteID: newCustomers.ClienteID,
        Nombre: newCustomers.Nombre,
        Apellido: newCustomers.Apellido,
        Direccion: newCustomers.Direccion,
        Telefono: newCustomers.Telefono,
        CorreoElectronico: newCustomers.CorreoElectronico
      });
      await this.clientesRepository.save(customers);
      return customers;
    }
    async updateCustomersData(id: number, updatedCustomers: Partial<Clientes>): Promise<Clientes> {
      const customers = await this.clientesRepository.findOneBy({ClienteID: id});
      if (!customers) {
        throw new ConflictException('Cliente no encontrado');
      }
      if (updatedCustomers.Nombre) {
        customers.Nombre = updatedCustomers.Nombre;
      }
      if (updatedCustomers.Apellido) {
        customers.Apellido = updatedCustomers.Apellido;
      }
      if (updatedCustomers.Direccion) {
        customers.Direccion = updatedCustomers.Direccion;
      }
      if (updatedCustomers.Telefono) {
        customers.Telefono = updatedCustomers.Telefono;
      }
      if (updatedCustomers.CorreoElectronico) {
        customers.CorreoElectronico = updatedCustomers.CorreoElectronico;
      }
      await this.clientesRepository.save(customers);
      return customers;
    }
}
