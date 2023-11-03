import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeormService } from '../services/typeorm.service';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './users.model';
import { Categorias } from './categories.model';
import { CategoriesController } from 'src/controllers/categories.controller';
import { CategoriesService } from 'src/services/categories.service';
import { SuppliersController } from 'src/controllers/suppliers.controller';
import { SuppliersService } from 'src/services/suppliers.service';
import { Proveedores } from './suppliers.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Usuarios, Categorias, Proveedores])
  ],
  controllers: [AppController, UsersController, CategoriesController, SuppliersController],
  providers: [AppService, TypeormService, UsersService, CategoriesService, SuppliersService],
})
export class AppModule {}
