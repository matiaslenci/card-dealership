import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Car extends Document {
  brand: string;

  @Prop({
    unique: true,
    index: true,
  })
  model: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
