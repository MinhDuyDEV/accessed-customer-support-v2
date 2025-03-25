import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Priority, TicketStatus, TicketType } from 'src/common/enums/ticket.enum';

export type TicketDocument = Ticket & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Ticket {
  @ApiProperty({ description: 'Ticket ID', example: 'TC-123' })
  @Prop({ required: true, unique: true })
  ticketId: string;

  @ApiProperty({
    description: 'Customer ID from party service',
    example: '60d5ec9af682fbd6a4221d55',
  })
  @Prop({ required: true })
  CustomerId: string;

  @ApiProperty({ description: 'Customer information' })
  @Prop({ type: Object, default: {} })
  customer: Record<string, any>;

  @ApiProperty({ description: 'Assignee information' })
  @Prop({ type: Object, default: {} })
  assignee: Record<string, any>;

  @ApiProperty({ description: 'Created by user ID', example: '60d5ec9af682fbd6a4221d44' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createBy: MongooseSchema.Types.ObjectId;

  @ApiProperty({ description: 'Ticket name', example: 'Account Issue' })
  @Prop({ required: true })
  ticketName: string;

  @ApiProperty({ description: 'Ticket subject', example: 'Defective Item Received' })
  @Prop({ required: true })
  subject: string;

  @ApiProperty({
    description: 'Ticket message/description',
    example: 'I received a broken item...',
  })
  @Prop({ required: true })
  message: string;

  @ApiProperty({ enum: TicketType, description: 'Ticket type', example: TicketType.INCIDENT })
  @Prop({ required: true, enum: TicketType, default: TicketType.INCIDENT })
  ticketType: string;

  @ApiProperty({ enum: Priority, description: 'Priority level', example: Priority.HIGH })
  @Prop({ required: true, enum: Priority, default: Priority.MEDIUM })
  priority: string;

  @ApiProperty({ enum: TicketStatus, description: 'Ticket status', example: TicketStatus.OPEN })
  @Prop({ required: true, enum: TicketStatus, default: TicketStatus.OPEN })
  status: string;

  @ApiProperty({ description: 'Source of the ticket', example: 'web' })
  @Prop({ default: 'web' })
  source: string;

  @ApiProperty({ description: 'First response due date', example: '2023-12-13T10:00:00Z' })
  @Prop()
  firstResponseDue: Date;

  @ApiProperty({ description: 'Resolution due date', example: '2023-12-15T10:00:00Z' })
  @Prop()
  resolutionDue: Date;

  @ApiProperty({ description: 'Activities related to this ticket' })
  @Prop({ type: [{ type: Object }], default: [] })
  activities: Record<string, any>[];

  @ApiProperty({ description: 'Tasks related to this ticket' })
  @Prop({ type: [{ type: Object }], default: [] })
  task: Record<string, any>[];

  @ApiProperty({ description: 'Notes related to this ticket' })
  @Prop({ type: [{ type: Object }], default: [] })
  notes: Record<string, any>[];

  @ApiProperty({ description: 'Media/Attachments', type: [Object] })
  @Prop({ type: [{ type: Object }], default: [] })
  media: Record<string, any>[];

  @ApiProperty({ description: 'Creation date', example: '2023-12-10T09:30:00Z' })
  @Prop({ default: Date.now })
  createDate: Date;

  @ApiProperty({ description: 'Tags', type: [String] })
  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
TicketSchema.plugin(mongoosePaginate);
