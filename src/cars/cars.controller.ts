import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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

  /**
   * Crea un nuevo auto
   * @param body decorador especial de Nest para manipular el body
   * de nuestra req
   * @returns el objeto auto que creamos
   */
  @Post()
  createCar(@Body() body: any) {
    return body;
  }

  /**
   * Actualiza los valores del auto que especifiquemos
   * espera un id como parametro
   * @returns el auto actualizado
   */
  @Patch(':id')
  updateCar(
    @Param('id', ParseIntPipe)
    @Body()
    body: any,
  ) {
    return body;
  }

  /**
   * elimina un auto
   * @param id del auto que se quiere eliminar
   * @returns el id del objeto eliminado
   */
  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'delete',
      id,
    };
  }
}
