import { HttpStatus, Injectable } from '@nestjs/common';
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
    const car = this.cars.find((car) => car.id === id);
    if (car.id) {
      //devuelve el auto
      return car;
    } else {
      //Si no encuentra el id del auto devuelve un 404
      console.error(`Error:${HttpStatus.NOT_FOUND}`);
    }
  }
}
