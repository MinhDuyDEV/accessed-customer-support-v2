import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from 'src/core/schemas/base/base.schema';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
}

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends BaseSchema {
  @Prop()
  userId: string;
  @Prop({ default: Date.now })
  createdDate: Date;
  @Prop({ default: Date.now })
  updatedDate: Date;
  @Prop({ required: false })
  lastApplied: Date;
  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;
  @Prop({ required: true })
  firstName: string;
  @Prop()
  middleName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: false })
  email: string;
  @Prop({ type: [String], default: [] })
  emails: string[];
  @Prop({ required: false })
  phoneNumber: string;
  @Prop({ required: false, default: 0 })
  rating: number;
  @Prop({ type: [String], default: [] })
  phones: string[];
  @Prop({ required: false })
  jobTitle: string;
  @Prop({ default: '' })
  city: string;
  @Prop({ default: '' })
  state: string;
  @Prop({ default: '' })
  country: string;
  @Prop({ default: '' })
  countryCode: string;
  @Prop({ default: '' })
  isoCode2: string;
  @Prop({ type: [Number] })
  latlong: number[];
  @Prop({ default: '' })
  timezone: string;
  @Prop()
  language: string;
  @Prop()
  mobilePhone: string;
  @Prop()
  avatar: string;
  @Prop({ type: Boolean, default: false })
  isAgent: boolean;
  @Prop({ type: [String], default: [] })
  roles: string[];
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Ticket' }] })
  assignedTickets: MongooseSchema.Types.ObjectId[];
  @Prop()
  department: string;
  @Prop({ type: Object, default: {} })
  preferences: Record<string, any>;
  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;
  @Prop({ type: Boolean, default: false })
  isPhoneVerified: boolean;
  @Prop()
  lastLoginDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
