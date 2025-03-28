import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Priority, TicketStatus, TicketType } from 'src/common/enums/ticket.enum';
import { BaseSchema } from 'src/core/schemas/base/base.schema';

export type TicketDocument = Ticket & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Ticket extends BaseSchema {
  @Prop({ required: true, unique: true })
  ticketId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ type: Object, default: {} })
  customer: Record<string, any>;

  @Prop({ type: Object, default: {} })
  assignee: Record<string, any>;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: TicketType, default: TicketType.INCIDENT })
  ticketType: string;

  @Prop({ required: true, enum: Priority, default: Priority.MEDIUM })
  priority: string;

  @Prop({ required: true, enum: TicketStatus, default: TicketStatus.OPEN })
  status: string;

  @Prop({ default: 'web' })
  source: string;

  @Prop()
  firstResponseDue: Date;

  @Prop()
  resolutionDue: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

// Compound index for popular filter fields
TicketSchema.index({ status: 1, priority: 1, ticketType: 1 });
// Index for customerId because often query by customer
TicketSchema.index({ customerId: 1 });
// Index for ticketId (unique)
TicketSchema.index({ ticketId: 1 }, { unique: true });
// Index for sort
TicketSchema.index({ createdAt: -1 });
// Text index for search
TicketSchema.index(
  { subject: 'text', message: 'text' },
  {
    weights: {
      subject: 2, // subject important more than message
      message: 1,
    },
    name: 'TextIndex',
  },
);
// Index for assignee.id because often query by assignee
TicketSchema.index({ 'assignee.id': 1 });
TicketSchema.virtual('recentActivities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'ticket',
  options: {
    sort: { createdAt: -1 },
    limit: 3,
  },
});

TicketSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'ticket',
  options: { sort: { createdAt: -1 } },
});

TicketSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'ticket',
  options: { sort: { createdAt: -1 } },
});

TicketSchema.virtual('media', {
  ref: 'File',
  localField: '_id',
  foreignField: 'ticket',
  options: { sort: { createdAt: -1 } },
});

TicketSchema.plugin(mongoosePaginate);
