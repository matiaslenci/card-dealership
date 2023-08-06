import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandSrv: BrandsService) {}

  @Post()
  //? Podemos personalizar el estatus code con el decorador @HttpCode
  //@HttpCode(202) //* Pasarle el codigo
  //@HttpCode(HttpStatus.ACCEPTED) //* Pasarle el mensaje de status
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandSrv.create(createBrandDto);
  }

  @Get()
  findAll() {
    return;
  }

  /**
   * @param term termino de busqueda
   */
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.brandSrv.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandSrv.update(term, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
