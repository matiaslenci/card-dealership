import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    createBrandDto.name = createBrandDto.name.toLocaleLowerCase();

    const brand = await this.brandModel.create(createBrandDto);

    return brand;
  }
}
