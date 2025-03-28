import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from 'src/core/schemas/base/base.schema';

export type NoteDocument = Note & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Note extends BaseSchema {
  @Prop({ required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  isPrivate: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.virtual('media', {
  ref: 'File',
  localField: '_id',
  foreignField: 'note',
  options: { sort: { createdAt: -1 } },
});

NoteSchema.plugin(mongoosePaginate);
