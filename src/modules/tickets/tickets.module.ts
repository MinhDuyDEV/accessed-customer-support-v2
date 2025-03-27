import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { TicketsRepository } from 'src/core/repositories/tickets.repository';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    ActivitiesModule,
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    { provide: 'TicketsRepositoryInterface', useClass: TicketsRepository },
  ],
  exports: [TicketsService],
})
export class TicketsModule {}
