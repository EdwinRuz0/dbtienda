import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TypeormService],
})
export class AppModule {}
