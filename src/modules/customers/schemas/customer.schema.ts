import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { CustomerStatus } from 'src/common/enums/status.enum';
import { BaseSchema } from 'src/core/schemas/base/base.schema';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Customer extends BaseSchema {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  middleName: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false, default: [] })
  emails: string[];

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false, default: [] })
  phones: string[];

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  countryCode: string;

  @Prop({ required: false })
  isoCode2: string;

  @Prop({ required: false })
  timezone: string;

  @Prop({ required: false })
  language: string;

  @Prop({ required: false })
  mobilePhone: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false, enum: CustomerStatus, default: CustomerStatus.ACTIVE })
  status: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.plugin(mongoosePaginate);
