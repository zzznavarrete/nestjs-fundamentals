import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModel } from './products/products.module';

@Module({
  imports: [ProductsModel],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
