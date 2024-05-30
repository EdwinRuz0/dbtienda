import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class TypeormService  implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
     return {
        type: 'mssql',
        host: 'localhost',
        username: 'JosueTamay',
        password: 'compania12',
        port: 1433,
        database: 'Abarrotes_La_Bendicion_De_Dios',
        entities: ['dist//**/*.model.{ts.js}'],
        autoLoadEntities: true,
        synchronize: false,
        options:{encrypt:false},
     }   
    }
}
