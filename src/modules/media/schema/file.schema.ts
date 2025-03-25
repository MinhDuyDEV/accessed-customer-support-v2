import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum FileStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
  ARCHIVED = 'archived',
}

export type FileDocument = File & Document;

@Schema({
  timestamps: false,
  versionKey: false,
})
export class File {
  @ApiProperty({ description: 'File ID', example: 100001 })
  @Prop({ type: Number })
  fileId: number;

  @ApiProperty({ enum: FileStatus, description: 'File status', example: FileStatus.ACTIVE })
  @Prop({ enum: FileStatus, default: FileStatus.ACTIVE })
  status: string;

  @ApiProperty({ description: 'Creation date', example: 1677667200000 })
  @Prop({ type: Number, default: Date.now })
  createdDate: number;

  @ApiProperty({ description: 'Created by user', example: 12345 })
  @Prop({ type: Number, required: false })
  createdBy: number;

  @ApiProperty({ description: 'Last modified date', example: 1677753600000 })
  @Prop({ type: Number, default: Date.now })
  lastModifiedDate: number;

  @ApiProperty({ description: 'Last modified by user', example: 12345 })
  @Prop({ type: Number })
  lastModifiedBy: number;

  @ApiProperty({ description: 'File type', example: 'image/jpeg' })
  @Prop({ required: true })
  fileType: string;

  @ApiProperty({ description: 'Filename', example: 'product_image.jpg' })
  @Prop({ required: true })
  filename: string;

  @ApiProperty({ description: 'File path', example: '/uploads/2023/03/01/product_image.jpg' })
  @Prop()
  path: string;

  @ApiProperty({ description: 'File description', example: 'Product image showing the defect' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'File hash', example: 'a1b2c3d4e5f6...' })
  @Prop()
  hash: string;

  @ApiProperty({ description: 'Related ticket ID', example: '60d5ec9af682fbd6a4221d77' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket' })
  ticket: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'File size in bytes', example: 1024000 })
  @Prop({ type: Number })
  size: number;

  @ApiProperty({ description: 'MIME content type', example: 'image/jpeg' })
  @Prop()
  contentType: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.plugin(mongoosePaginate);
