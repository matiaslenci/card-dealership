import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsSrv: CarsService) {}

  @Get() // /cars
  getAllCars() {
    //Retorna un array con nombres de autos
    return this.carsSrv.findAllCars();
  }

  @Get(':id') // /cars/:id
  getCarById(@Param('id', ParseIntPipe) id: number) {
    //Retorna el auto que coincida el id con la posicion del array
    return this.carsSrv.findCardByid(id);
  }
}
