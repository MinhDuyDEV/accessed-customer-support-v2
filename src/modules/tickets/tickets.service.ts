import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Ticket } from './schemas/ticket.schema';
import { TicketsRepositoryInterface } from 'src/core/repositories/interfaces/tickets.interface';

@Injectable()
export class TicketsService extends BaseServiceAbstract<Ticket> {
  constructor(
    @Inject('TicketsRepositoryInterface')
    private readonly ticketsRepository: TicketsRepositoryInterface,
  ) {
    super(ticketsRepository);
  }
}
