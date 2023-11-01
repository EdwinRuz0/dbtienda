//users.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { Usuarios } from 'src/models/users.model';
import { UsersService } from 'src/services/users.service';
@Controller()
export class UsersController {
constructor(private readonly usersService: UsersService) {}
@Get('/api')
  async getAllUsers() { //obtener todos los datos de todos los usuarios
    const users = await this.usersService.getAllUsers();
    return users;
  } 
  @Get('/api/id/:id') //obtener todos los datos del usuario por el id
  async getUserDataId(@Param('id') userId: number) {
    const user = await this.usersService.getUserDataId(userId);
    return user;
  }
  @Delete('/api/id/:id') //borrar usuario con el id
  async deleteUserI(@Param('id') userId: number) {
    await this.usersService.deleteUserId(userId);
    return { message: 'Usuario eliminado con éxito' };
  }
  @Post('/api/register') //anadir nuevos usuarios
  async registerNewUser(@Body() newUser : Usuarios) {
    const user = await this.usersService.createNewUser(newUser);
    return { message: 'Usuario agregado con éxito' };
  }
  @Put('/api/update/:id') //buscar al usuario por el id y luego actualizar el dato de un usurio
  async updateUserData(@Param('id') userId: number, @Body() updatedUserData: Usuarios) {
    const updatedUser = await this.usersService.updateUserData(userId, updatedUserData);
    return { message: 'Datos Actualizados con éxito' };;
  }
}
