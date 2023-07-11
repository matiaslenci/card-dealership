import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './interfaces/cars.interfaces';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  /**
   * @returns lista con todos los autos
   */
  findAllCars() {
    return this.cars;
  }

  /**
   * @param id que obtenemos de los query params
   * @returns el auto por el id
   */
  findCardByid(id: number) {
    //Busca el id que coincida con el id de un auto y lo guarda en la var car
    const car = this.cars.find((car) => car.id === id);
    //Si no encuentra un auto con ese id devuelve un 404 bad request
    if (!car) {
      throw new NotFoundException(
        `El auto con el id '${id}' no fue encontrado`,
      );
    }
    // Si encuentra el id del auto lo retorna
    return car;
  }
}
