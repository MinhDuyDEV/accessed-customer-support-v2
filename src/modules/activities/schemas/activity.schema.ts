import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum ActivityType {
  TICKET_CREATED = 'Ticket Created',
  TYPE_CHANGED = 'Type Changed',
  PRIORITY_CHANGED = 'Priority Changed',
  STATUS_CHANGED = 'Status Changed',
  ASSIGNED = 'Assigned',
  NOTE_ADDED = 'Note Added',
  ATTACHMENT_ADDED = 'Attachment Added',
  TASK_CREATED = 'Task Created',
  TASK_COMPLETED = 'Task Completed',
  CALL = 'Call',
  EMAIL = 'Email',
  CLIENT_CONTACTED = 'Client Contacted',
}

export type ActivityDocument = Activity & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Activity {
  @ApiProperty({
    enum: ActivityType,
    description: 'Activity type',
    example: ActivityType.TICKET_CREATED,
  })
  @Prop({ required: true, enum: ActivityType })
  type: ActivityType;

  @ApiProperty({
    description: 'Activity description',
    example: 'Santi contacted for the first time',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Related ticket ID', example: '60d5ec9af682fbd6a4221d77' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Performed by user ID', example: '60d5ec9af682fbd6a4221d44' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  performedBy: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Additional data as JSON' })
  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @ApiProperty({ description: 'Activity date', example: '2023-12-13T10:30:00Z' })
  @Prop({ default: Date.now })
  activityDate: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
ActivitySchema.plugin(mongoosePaginate);
