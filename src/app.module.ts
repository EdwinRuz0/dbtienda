import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm.service';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './models/users.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Usuarios])
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, TypeormService, UsersService],
})
export class AppModule {}
