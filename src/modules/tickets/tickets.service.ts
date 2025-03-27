import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Ticket } from './schemas/ticket.schema';
import { TicketsRepositoryInterface } from 'src/core/repositories/interfaces/tickets.interface';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FindAllResponse } from 'src/common/types/common.type';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { ActivitiesService } from '../activities/activities.service';
import { TicketStatus, Priority } from 'src/common/enums/ticket.enum';
import { TICKET_TYPE_PRIORITY_MAP } from 'src/common/constants/ticket-type-priority-map';
import { ActivityType } from '../activities/schemas/activity.schema';
import { SLA_CONFIG } from 'src/common/constants/sla-config';

@Injectable()
export class TicketsService extends BaseServiceAbstract<Ticket> {
  constructor(
    @Inject('TicketsRepositoryInterface')
    private readonly ticketsRepository: TicketsRepositoryInterface,
    private readonly activitiesService: ActivitiesService,
  ) {
    super(ticketsRepository);
  }

  async create(createTicketDto: CreateTicketDto) {
    const customer = await this.validateCustomer(createTicketDto.customerId);
    const ticketId = `TK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const priority = TICKET_TYPE_PRIORITY_MAP[createTicketDto.ticketType] || Priority.LOW;
    const sla = SLA_CONFIG[priority];
    const firstResponseDue = new Date(new Date().getTime() + sla.firstResponse * 60 * 60 * 1000);
    const resolutionDue = new Date(new Date().getTime() + sla.resolution * 60 * 60 * 1000);
    const assignee = await this.determineAssignee(priority, createTicketDto.ticketType);
    const ticketData = {
      ...createTicketDto,
      ticketId,
      customerId: createTicketDto.customerId,
      customer: customer,
      createBy: createTicketDto.customerId || null,
      status: TicketStatus.OPEN,
      priority,
      firstResponseDue,
      resolutionDue,
      assignee,
    };

    const ticket = await this.ticketsRepository.create(ticketData);
    await this.activitiesService.create({
      type: ActivityType.TICKET_CREATED,
      description: `Ticket ${ticketId} created`,
      customer: createTicketDto.customerId,
      ticket: ticket._id,
      metadata: {
        priority,
        ticketType: createTicketDto.ticketType,
        assignee: assignee?.id,
      },
    });

    return ticket;
  }

  private async validateCustomer(customerId: string) {
    // TODO: Implement customer validation from party service
    const customer = {
      id: customerId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St, Anytown, USA',
      city: 'Anytown',
    };
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  private async determineAssignee(priority: Priority, ticketType: string) {
    console.log('priority', priority);
    console.log('ticketType', ticketType);
    // TODO: Implement assignee determination logic
    return {
      id: '66f000000000000000000000',
      firstName: 'Duy',
      lastName: 'Minh',
      email: 'duy.nguyen@example.com',
      phone: '+1234567890',
      role: 'sales',
      status: 'active',
    };
  }

  async findAll(query: QueryTicketDto): Promise<FindAllResponse<Ticket>> {
    const conditions = this.buildFilterConditions(query);
    const options = this.buildQueryOptions(query);

    return await this.ticketsRepository.findAll(conditions, options);
  }

  private buildFilterConditions(query: QueryTicketDto): Record<string, any> {
    const conditions: Record<string, any> = {};
    const filterMap = {
      status: 'status',
      ticketType: 'ticketType',
      priority: 'priority',
      assignedTo: 'assignee.id',
      customerId: 'customerId',
    };

    Object.entries(filterMap).forEach(([queryField, dbField]) => {
      if (query[queryField]) {
        conditions[dbField] = query[queryField];
      }
    });

    if (query.search) {
      conditions.$or = [
        { subject: { $regex: query.search, $options: 'i' } },
        { message: { $regex: query.search, $options: 'i' } },
      ];
    }

    return conditions;
  }

  private buildQueryOptions(query: QueryTicketDto): Record<string, any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
      sort: { [query.sort || 'createdAt']: query.order === 'asc' ? 1 : -1 },
      lean: true,
    };
  }

  async findOneById(id: string) {
    const populateOptions = {
      populate: [
        {
          path: 'recentActivities',
          select: 'type description createdAt user',
          options: { sort: { createdAt: -1 }, limit: 3 },
        },
        {
          path: 'tasks',
          select: 'title status priority dueDate',
          options: { sort: { createdAt: -1 }, limit: 3 },
        },
        {
          path: 'notes',
          select: 'content createdAt createdBy isPrivate',
          options: { sort: { createdAt: -1 }, limit: 3 },
        },
      ],
    };

    const ticket = await this.ticketsRepository.findOneById(id, null, populateOptions);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }
}
