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
      this.handleExceptions(error);
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

  /**
   *
   * Actualiza el no o el name del brand
   *
   * @param term id/name/numero
   * @returns brand actualizado
   */
  async update(term: string, updateBrandDto: UpdateBrandDto) {
    const brand: Brand = await this.findOne(term);

    try {
      if (updateBrandDto.name)
        updateBrandDto.name = updateBrandDto.name.toLocaleLowerCase();

      await brand.updateOne(updateBrandDto);

      return { ...brand.toJSON(), ...updateBrandDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  /**
   * Elimina un brand por el id de mongo
   * @param id Mongo id existente
   * @returns brand
   */
  async remove(id: string): Promise<any> {
    //* Eliminar brand por id/no/name
    /*  const brand = await this.findOne(id);
    await brand.deleteOne(); 

    return brand;*/

    //const brand = this.brandModel.findByIdAndDelete(id);

    const { deletedCount } = await this.brandModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Brand with id "${id}" not found`);
    }

    return;
  }

  /**
   * Manejo de excepciones de duplicidad
   * @param error
   */
  private handleExceptions(error: any) {
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
