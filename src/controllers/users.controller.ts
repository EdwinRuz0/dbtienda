//users.controller.ts
import { Controller, Get, Param, Delete, Post, Body, Put, ConflictException } from '@nestjs/common';
import { Usuarios } from 'src/models/users.model';
import { UsersService } from 'src/services/users.service';
import * as jwt from 'jsonwebtoken';
import { async } from 'rxjs';
@Controller()
export class UsersController {
constructor(private readonly usersService: UsersService) {}
@Get('/api/usuario')
  async getAllUsers() { //obtener todos los datos de todos los usuarios
    const users = await this.usersService.getAllUsers();
    return users;
  } 
  @Get('/api/usuario/:id') //obtener todos los datos del usuario por el id
  async getUserDataId(@Param('id') userId: number) {
    const user = await this.usersService.getUserDataId(userId);
    return user;
  }
  @Get('/api/usuarioName/:name') //obtener todos los datos del usuario por el id
  async getUserDataUserName(@Param('name') username: string) {
    const user = await this.usersService.getUserDataUserName(username);
    return user;
  }
  @Delete('/api/usuario/:id') //borrar usuario con el id
  async deleteUserI(@Param('id') userId: number) {
    await this.usersService.deleteUserId(userId);
    return { message: 'Usuario eliminado con éxito' };
  }
  @Post('/api/usuario') //anadir nuevos usuarios
  async registerNewUser(@Body() newUser : Usuarios) {
    const user = await this.usersService.createNewUser(newUser);
    return { message: 'Usuario agregado con éxito' };
  }
  @Put('/api/usuario/:id') //buscar al usuario por el id y luego actualizar el dato de un usurio
  async updateUserData(@Param('id') userId: number, @Body() updatedUserData: Usuarios) {
    const updatedUser = await this.usersService.updateUserData(userId, updatedUserData);
    return { message: 'Datos Actualizados con éxito' };;
  }
  @Post('/api/login')
  async login(@Body() credentials: {UserName: string, Password: string }) {
    const { UserName, Password } = credentials;
    const user = await this.usersService.getUserDataUserName(UserName);
    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }
    const isPasswordValid = await this.usersService.verifyPassword(UserName, Password);
    if (!isPasswordValid) {
      throw new ConflictException('Contraseña incorrecta');
    }
    const token = jwt.sign({ sub: user.UserName }, 'mi-llave-secreta', { expiresIn: '1h' });
    return { Estado: 'Inicio de sesión exitoso', token, role: user.Rol, id: user.UsuarioID, name: user.UserName };
  }
}
