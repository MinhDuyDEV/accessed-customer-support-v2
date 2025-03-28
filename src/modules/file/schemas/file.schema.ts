import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from 'src/core/schemas/base/base.schema';

export enum FileStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
}

export type FileDocument = File & Document;

@Schema({
  timestamps: false,
  versionKey: false,
})
export class File extends BaseSchema {
  @Prop({ type: Number })
  fileId: number;

  @Prop({ enum: FileStatus, default: FileStatus.ACTIVE })
  status: string;

  @Prop({ type: Number, default: Date.now })
  createdDate: number;

  @Prop({ type: Number, required: false })
  createdBy: number;

  @Prop({ type: Number, default: Date.now })
  lastModifiedDate: number;

  @Prop({ type: Number })
  lastModifiedBy: number;

  @Prop({ required: true })
  fileType: string;

  @Prop({ required: true })
  filename: string;

  @Prop()
  path: string;

  @Prop()
  description: string;

  @Prop()
  hash: string;

  @Prop({ type: Number })
  size: number;

  @Prop()
  contentType: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket' })
  ticket: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Note' })
  note: MongooseSchema.Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.plugin(mongoosePaginate);
