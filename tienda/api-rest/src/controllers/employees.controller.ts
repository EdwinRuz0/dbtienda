//employees.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Empleados } from 'src/models/employees.model';
import { EmployeesService } from 'src/services/employees.service';
@Controller()
export class EmployeesController {
constructor(private readonly employeesService: EmployeesService) {}
@Get('/api/empleados')
  async getAllEmployees() { //obtener todos los datos de todos los empleados
    const employees = await this.employeesService.getAllEmployees();
    return employees;
  } 
  @Get('/api/empleados/:id') //obtener todos los datos del empleado por el id
  async getEmployeesDataId(@Param('id') id: number) {
    const employees = await this.employeesService.getEmployeesDataId(id);
    return employees;
  }
  @Delete('/api/empleados/:id') //borrar empleado con el id
  async deleteEmployeesId(@Param('id') id: number) {
    await this.employeesService.deleteEmployeesId(id);
    return { message: 'Empleado eliminado con éxito' };
  }
  @Post('/api/empleados') //anadir nuevos empleados
  async registerNewEmployees(@Body() newEmployees : Empleados) {
    const employees = await this.employeesService.createNewEmployees(newEmployees);
    return { message: 'Empleado agregado con éxito' };
  }
  @Put('/api/empleados/:id') //buscar al empleado por el id y luego actualizar el dato de un proveedor
  async updateEmployeesData(@Param('id') id: number, @Body() updatedEmployeesData: Empleados) {
    const updatedEmployees = await this.employeesService.updateEmployeesData(id, updatedEmployeesData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
