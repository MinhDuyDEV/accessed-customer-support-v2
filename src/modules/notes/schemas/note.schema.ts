import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum NoteType {
  TICKET_NOTE = 'Ticket Note',
  CLIENT_NOTE = 'Client Note',
  INTERNAL_NOTE = 'Internal Note',
}

export type NoteDocument = Note & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Note {
  @ApiProperty({ description: 'Subject type', example: 'Ticket' })
  @Prop({ required: true })
  subjectType: string;

  @ApiProperty({ description: 'Subject information' })
  @Prop({ type: MongooseSchema.Types.Mixed })
  subject: Record<string, any>;

  @ApiProperty({
    description: 'Note message',
    example: 'Customer requested a follow-up call tomorrow',
  })
  @Prop({ required: true })
  message: string;

  @ApiProperty({ description: 'Creation date', example: 1677667200000 })
  @Prop({ type: Number, default: Date.now })
  createdDate: number;

  @ApiProperty({ description: 'Last updated date', example: 1677753600000 })
  @Prop({ type: Number })
  lastUpdatedDate: number;

  @ApiProperty({ description: 'Viewers of the note' })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  viewers: MongooseSchema.Types.ObjectId[];

  @ApiProperty({ description: 'Created by user', example: '60d5ec9af682fbd6a4221d44' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Is note pinned', example: false })
  @Prop({ default: false })
  isPinned: boolean;

  @ApiProperty({ description: 'Is visible to client', example: false })
  @Prop({ default: false })
  isVisibleToClient: boolean;

  @ApiProperty({ enum: NoteType, description: 'Note type', example: NoteType.TICKET_NOTE })
  @Prop({ enum: NoteType, default: NoteType.TICKET_NOTE })
  type: NoteType;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.plugin(mongoosePaginate);
