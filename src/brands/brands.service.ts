import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {}

  /**
   *
   * Pasa el nombre a minuscula y si no hay errores crea una marca
   *
   * @returns nueva marca
   */
  async create(createBrandDto: CreateBrandDto) {
    createBrandDto.name = createBrandDto.name.toLocaleLowerCase();
    try {
      const brand = await this.brandModel.create(createBrandDto);

      return brand;
    } catch (error) {
      //! Error de duplicidad de mongodb por el nombre de la marca
      if (error.code === 11000) {
        throw new BadRequestException(
          `This Brand exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        "Can't create Brand - Check server logs",
      );
    }
  }

  /**
   *
   * @param term termino de busqueda puede ser id,numero de la marca o nombre
   * @returns marca buscada
   */
  async findOne(term: string) {
    let brand: Brand;

    // No.
    if (!isNaN(+term)) {
      brand = await this.brandModel.findOne({ no: term });
    }

    // MongoId
    if (!brand && isValidObjectId(term)) {
      brand = await this.brandModel.findById(term);
    }

    // Name
    if (!brand) {
      brand = await this.brandModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    //! Si no encuentra ninguno
    if (!brand) {
      throw new NotFoundException(`Brand with id,name or no ${term} not found`);
    }

    return brand;
  }
}
