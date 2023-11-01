//users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/models/users.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Usuarios) private usersRepository: Repository<Usuarios>){
        
    }
    async getAllUsers(): Promise<Usuarios[]> {
        return await this.usersRepository.find();
    }
    async getUserDataId(id: number): Promise<Usuarios>{
        const userDoc = await this.usersRepository.findOneBy({UsuarioID: id})
        if (!userDoc) {
            throw new ConflictException('Usuario no encontrado');
        }
        return userDoc;
    }
    async getUserDataUserName(UserName: string): Promise<Usuarios>{
      const userDoc = await this.usersRepository.findOne({ where: { UserName: UserName } });
      if (!userDoc) {
          throw new ConflictException('Usuario no encontrado');
      }
      return userDoc;
  }
    async deleteUserId(UserID: number): Promise<void> {
        const user = await this.usersRepository.findOneBy({UsuarioID: UserID});
        if (!user) {
          throw new ConflictException('Usuario no encontrado');
        }
        await this.usersRepository.remove(user);
    }

    async createNewUser(newUser: Usuarios): Promise<Usuarios> {
      if (newUser.Password.length <= 6) {
        throw new ConflictException('La contraseña no cumple con los requisitos de seguridad (mínimo 7 caracteres)');
      }
      const lastUserId = await this.usersRepository
        .createQueryBuilder('usuario')
        .select('MAX(usuario.UsuarioID)', 'maxId')
        .getRawOne();
      const newUserId = lastUserId.maxId ? lastUserId.maxId + 1 : 1;
      newUser.UsuarioID = newUserId;
      const hashedPassword = await bcrypt.hash(newUser.Password, 10);
      const user = this.usersRepository.create({
        UsuarioID: newUser.UsuarioID,
        UserName: newUser.UserName,
        Password: hashedPassword,
        Rol: 'usuario',
      });
      await this.usersRepository.save(user);
      return user;
    }
    async updateUserData(UserID: number, updatedUser: Partial<Usuarios>): Promise<Usuarios> {
      const user = await this.usersRepository.findOneBy({UsuarioID: UserID});
      if (!user) {
        throw new ConflictException('Usuario no encontrado');
      }
      if (updatedUser.UserName) {
        user.UserName = updatedUser.UserName;
      }
      if (updatedUser.Password) {
        if (updatedUser.Password.length <= 6) {
          throw new ConflictException('La contraseña no cumple con los requisitos de seguridad (mínimo 7 caracteres)');
        }
        const hashedPassword = await bcrypt.hash(updatedUser.Password, 10);
        user.Password = hashedPassword;
      }
      if (updatedUser.Rol) {
        user.Rol = updatedUser.Rol;
      }
      await this.usersRepository.save(user);
      return user;
    }
    async verifyPassword(UserName: string, Password: string): Promise<boolean> {
      const user = await this.getUserDataUserName(UserName);
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      return passwordMatch;
    }
}
