import { IsPositive, IsString, MinLength, Min, IsInt } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsPositive()
  @Min(1)
  @IsInt()
  no: number;
}
