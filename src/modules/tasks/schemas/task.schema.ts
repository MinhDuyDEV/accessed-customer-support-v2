import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Task {
  @ApiProperty({
    description: 'Task description',
    example: 'Validate that the problem has been resolved',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Is task completed', example: false })
  @Prop({ default: false })
  isCompleted: boolean;

  @ApiProperty({ description: 'Due date', example: '2023-12-14T12:00:00Z' })
  @Prop({ required: true })
  dueDate: Date;

  @ApiProperty({ description: 'Related ticket ID', example: '60d5ec9af682fbd6a4221d77' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Assigned user ID', example: '60d5ec9af682fbd6a4221d44' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  assignedTo: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Created by user ID', example: '60d5ec9af682fbd6a4221d44' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Completion date', example: '2023-12-14T14:30:00Z' })
  @Prop()
  completedAt: Date;

  @ApiProperty({ description: 'Priority level', example: 'high' })
  @Prop({ default: 'normal' })
  priority: string;

  @ApiProperty({ description: 'Reminder before due date (minutes)', example: 60 })
  @Prop({ type: Number })
  reminderMinutes: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.plugin(mongoosePaginate);
