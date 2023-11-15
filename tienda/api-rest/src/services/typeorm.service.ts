import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class TypeormService  implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
     return {
        type: 'mssql',
        host: '192.168.1.5',
        username: 'edwin',
        password: 'Ruz0090?',
        port: 1433,
        database: 'Abarrotes_La_Bendicion_De_Dios',
        entities: ['dist//**/*.model.{ts.js}'],
        autoLoadEntities: true,
        synchronize: false,
        options:{encrypt:false},
     }   
    }
}
