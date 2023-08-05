import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Brand extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  createdAt: number;
  updatedAt?: number;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
