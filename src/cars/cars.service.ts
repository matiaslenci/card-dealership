import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICar } from './interfaces/car.interfaces';
import { UpdateCarDto, CreateCarDto } from './dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
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
   * Encuentra un auto por el id
   *
   * @param id que obtenemos de los query params
   * @returns el auto por el id
   */
  findCardById(id: string) {
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

  /**
   * Crea un nuevo auto apartir de los datos que recibe del front
   *
   * @param createCarDto
   * @returns el nuevo auto
   */
  create(createCarDto: CreateCarDto) {
    const car: ICar = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }

  /**
   * Actualiza un auto con los valores que reciben
   *
   * @param id del auto que se quiere actualizar
   * @param updateCarDto
   */
  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findCardById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car id is not valid inside body');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return car;
      }
    });
    return carDB;
  }

  delete(id: string) {
    this.findCardById(id);
    this.cars.filter((car) => car.id !== id);
  }
}
