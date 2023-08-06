import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
