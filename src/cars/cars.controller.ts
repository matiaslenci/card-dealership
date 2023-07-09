import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  //Array de Autos
  private cars: string[] = ['Toyota', 'Honda', 'Jeep'];

  @Get('cars') // /cars
  getAllCars() {
    //Retorna un array con nombres de autos
    return this.cars;
  }

  @Get(':id') // /cars/:id
  getCarById(@Param('id') id: string) {
    //Retorna el auto que coincida el id con la posicion del array
    return this.cars[id];
  }
}
