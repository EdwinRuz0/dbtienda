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
import { Empleados } from './employees.model';
import { EmployeesController } from 'src/controllers/employees.controller';
import { EmployeesService } from 'src/services/employees.service';
import { Compras } from './purchases.model';
import { PurchasesController } from 'src/controllers/purchases.controller';
import { PurchasesService } from 'src/services/purchases.service';
import { DetallesCompra } from './purchasesDetails.model';
import { PurchasesDetailsController } from 'src/controllers/purchasesDetails.controller';
import { PurchasesDetailsService } from 'src/services/purchasesDetails.service';
import { Transacciones } from './transactions.model';
import { TransactionsController } from 'src/controllers/transactions.controller';
import { TransactionsService } from 'src/services/transactions.service';
import { Auditoria } from './auditory.model';
import { AuditoryController } from 'src/controllers/auditory.controller';
import { AuditoryService } from 'src/services/auditory.service';
import { ImagesController } from 'src/controllers/images.controller';
import { ImagesService } from 'src/services/images.service';
import { Imagen } from './images.model';
import { CarritoTemporal } from './temporaryCart.model';
import { TemporaryCartController } from 'src/controllers/temporaryCart.controller';
import { TemporaryCartService } from 'src/services/temporaryCart.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Usuarios, Categorias, Proveedores, Productos, Clientes, Ventas, DetallesVenta, Empleados, Compras, DetallesCompra, Transacciones, Auditoria, Imagen, CarritoTemporal])
  ],
  controllers: [AppController, UsersController, CategoriesController, SuppliersController, ProductsController, CustomersController, SalesController, DetailsSalesController, EmployeesController, PurchasesController, PurchasesDetailsController, TransactionsController, AuditoryController, ImagesController, TemporaryCartController],
  providers: [AppService, TypeormService, UsersService, CategoriesService, SuppliersService, ProductsService, CustomersService, SalesService, DetailsSalesService, EmployeesService, PurchasesService, PurchasesDetailsService, TransactionsService, AuditoryService, ImagesService, TemporaryCartService],
})
export class AppModule {}
