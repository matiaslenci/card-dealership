import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CarsModule,
    BrandsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-cars'),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
