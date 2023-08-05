import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
/**
 * ? Pipe a nivel de controlador
 * ! reemplazado por un pipe a nivel global
 */
//@UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsSrv: CarsService) {}

  @Get() // /cars
  getAllCars() {
    // Retorna un array con nombres de autos
    return this.carsSrv.findAllCars();
  }

  @Get(':id') // /cars/:id
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    // Retorna el auto que coincida el id con la posicion del array
    return this.carsSrv.findCardById(id);
  }

  /**
   * Crea un nuevo auto
   * @param createCarDto es el body de nuestra respuesta
   * de nuestra req
   * @returns el objeto auto que creamos
   */
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsSrv.create(createCarDto);
  }

  /**
   * Actualiza los valores del auto que especifiquemos
   * espera un id como parametro
   * @returns el auto actualizado
   */
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateCarDto: UpdateCarDto,
  ) {
    return this.carsSrv.update(id, updateCarDto);
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
