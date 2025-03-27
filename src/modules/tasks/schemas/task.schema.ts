import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from 'src/core/schemas/base/base.schema';

export enum TaskStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Task extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  assignee: MongooseSchema.Types.ObjectId;

  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status: string;

  @Prop({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: string;

  @Prop()
  dueDate: Date;

  @Prop({ type: Date })
  completedAt: Date;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.plugin(mongoosePaginate);
