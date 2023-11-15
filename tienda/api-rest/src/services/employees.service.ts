//employees.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleados } from 'src/models/employees.model';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Empleados) private empleadosRepository: Repository<Empleados>){
        
    }
    async getAllEmployees(): Promise<Empleados[]> {
        return await this.empleadosRepository.find();
    }
    async getEmployeesDataId(id: number): Promise<Empleados>{
        const employeesDoc = await this.empleadosRepository.findOneBy({EmpleadoID: id})
        if (!employeesDoc) {
            throw new ConflictException('Empleado no encontrado');
        }
        return employeesDoc;
    }
    async deleteEmployeesId(id: number): Promise<void> {
        const employees = await this.empleadosRepository.findOneBy({EmpleadoID: id});
        if (!employees) {
          throw new ConflictException('Empleado no encontrado');
        }
        await this.empleadosRepository.remove(employees);
    }

    async createNewEmployees(newEmployees: Empleados): Promise<Empleados> {
      const lastEmployeesId = await this.empleadosRepository
        .createQueryBuilder('empleados')
        .select('MAX(empleados.EmpleadoID)', 'maxId')
        .getRawOne();
      const newEmployeesId = lastEmployeesId.maxId ? lastEmployeesId.maxId + 1 : 1;
      newEmployees.EmpleadoID =  newEmployeesId;
      const employees = this.empleadosRepository.create({
        EmpleadoID: newEmployees.EmpleadoID,
        Nombre: newEmployees.Nombre,
        Apellido: newEmployees.Apellido,
        Puesto: newEmployees.Puesto,
        FechaInicio: newEmployees.FechaInicio,
        Salario: newEmployees.Salario
      });
      await this.empleadosRepository.save(employees);
      return employees;
    }
    async updateEmployeesData(id: number, updatedEmployees: Partial<Empleados>): Promise<Empleados> {
      const employees = await this.empleadosRepository.findOneBy({EmpleadoID: id});
      if (!employees) {
        throw new ConflictException('Empleado no encontrado');
      }
      if (updatedEmployees.Nombre) {
        employees.Nombre = updatedEmployees.Nombre;
      }
      if (updatedEmployees.Apellido) {
        employees.Apellido = updatedEmployees.Apellido;
      }
      if (updatedEmployees.Puesto) {
        employees.Puesto = updatedEmployees.Puesto;
      }
      if (updatedEmployees.FechaInicio) {
        employees.FechaInicio = updatedEmployees.FechaInicio;
      }
      if (updatedEmployees.Salario) {
        employees.Salario = updatedEmployees.Salario;
      }
      await this.empleadosRepository.save(employees);
      return employees;
    }
}
