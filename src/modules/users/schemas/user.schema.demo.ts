import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePaginate from 'mongoose-paginate-v2';

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
export class User {
  @ApiProperty({ description: 'User ID', example: 'USR-12345' })
  @Prop()
  userId: string;

  @ApiProperty({ description: 'Creation date' })
  @Prop({ default: Date.now })
  createdDate: Date;

  @ApiProperty({ description: 'Last updated date' })
  @Prop({ default: Date.now })
  updatedDate: Date;

  @ApiProperty({ description: 'Last applied date' })
  @Prop({ required: false })
  lastApplied: Date;

  @ApiProperty({ enum: UserStatus, description: 'User status', example: UserStatus.ACTIVE })
  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @ApiProperty({ description: 'First name', example: 'John' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ description: 'Middle name', example: 'William' })
  @Prop()
  middleName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ description: 'Primary email', example: 'john.doe@example.com' })
  @Prop({ required: false })
  email: string;

  @ApiProperty({ description: 'Additional emails', type: [String] })
  @Prop({ type: [String], default: [] })
  emails: string[];

  @ApiProperty({ description: 'Primary phone number', example: '+1234567890' })
  @Prop({ required: false })
  phoneNumber: string;

  @ApiProperty({ description: 'User rating', example: 4.5 })
  @Prop({ required: false, default: 0 })
  rating: number;

  @ApiProperty({ description: 'Additional phone numbers', type: [String] })
  @Prop({ type: [String], default: [] })
  phones: string[];

  @ApiProperty({ description: 'Job title', example: 'Support Engineer' })
  @Prop({ required: false })
  jobTitle: string;

  @ApiProperty({ description: 'City', example: 'New York' })
  @Prop({ default: '' })
  city: string;

  @ApiProperty({ description: 'State', example: 'NY' })
  @Prop({ default: '' })
  state: string;

  @ApiProperty({ description: 'Country', example: 'USA' })
  @Prop({ default: '' })
  country: string;

  @ApiProperty({ description: 'Country code', example: 'US' })
  @Prop({ default: '' })
  countryCode: string;

  @ApiProperty({ description: 'ISO country code', example: 'US' })
  @Prop({ default: '' })
  isoCode2: string;

  @ApiProperty({ description: 'Latitude and longitude', example: [40.7128, -74.006] })
  @Prop({ type: [Number] })
  latlong: number[];

  @ApiProperty({ description: 'Timezone', example: 'America/New_York' })
  @Prop({ default: '' })
  timezone: string;

  @ApiProperty({ description: 'Language', example: 'en-US' })
  @Prop()
  language: string;

  @ApiProperty({ description: 'Mobile phone', example: '+1987654321' })
  @Prop()
  mobilePhone: string;

  @ApiProperty({ description: 'Profile avatar URL', example: 'https://example.com/avatar.jpg' })
  @Prop()
  avatar: string;

  @ApiProperty({ description: 'Is user an agent', example: true })
  @Prop({ type: Boolean, default: false })
  isAgent: boolean;

  @ApiProperty({ description: 'User roles', type: [String] })
  @Prop({ type: [String], default: [] })
  roles: string[];

  @ApiProperty({ description: 'Assigned tickets' })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Ticket' }] })
  assignedTickets: MongooseSchema.Types.ObjectId[];

  @ApiProperty({ description: 'Department', example: 'Customer Support' })
  @Prop()
  department: string;

  @ApiProperty({ description: 'User preferences' })
  @Prop({ type: Object, default: {} })
  preferences: Record<string, any>;

  @ApiProperty({ description: 'Is email verified', example: true })
  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'Is phone verified', example: true })
  @Prop({ type: Boolean, default: false })
  isPhoneVerified: boolean;

  @ApiProperty({ description: 'Last login date' })
  @Prop()
  lastLoginDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
