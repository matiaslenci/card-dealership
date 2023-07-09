import { Injectable } from '@nestjs/common';
import { ICar } from './interfaces/cars.interfaces';

@Injectable()
export class CarsService {
  public cars: ICar[] = [
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
}
