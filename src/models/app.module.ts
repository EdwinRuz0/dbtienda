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
import { Productos } from './products.model';
import { ProductsController } from 'src/controllers/products.controller';
import { ProductsService } from 'src/services/products.service';
import { Clientes } from './customers.model';
import { CustomersController } from 'src/controllers/customers.controller';
import { CustomersService } from 'src/services/customers.service';
import { SalesController } from 'src/controllers/sales.controller';
import { SalesService } from 'src/services/sales.service';
import { Ventas } from './sales.model';
import { DetallesVenta } from './salesDetails.model';
import { DetailsSalesController } from 'src/controllers/salesDetails.controller';
import { DetailsSalesService } from 'src/services/salesDetails.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Usuarios, Categorias, Proveedores, Productos, Clientes, Ventas, DetallesVenta])
  ],
  controllers: [AppController, UsersController, CategoriesController, SuppliersController, ProductsController, CustomersController, SalesController, DetailsSalesController],
  providers: [AppService, TypeormService, UsersService, CategoriesService, SuppliersService, ProductsService, CustomersService, SalesService, DetailsSalesService],
})
export class AppModule {}
