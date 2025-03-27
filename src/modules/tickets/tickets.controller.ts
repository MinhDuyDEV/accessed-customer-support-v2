import { Body, Controller, Get, HttpStatus, Param, Post, Query, Version } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { QueryTicketDto } from './dto/query-ticket.dto';
// import { Customer } from 'src/common/decorators/customer.decorator';
// import { CustomerTokenInterceptor } from 'src/common/interceptors/customer-token.interceptor';

@ApiTags('tickets')
// @UseInterceptors(CustomerTokenInterceptor)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiBody({ type: CreateTicketDto })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Ticket has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid customer token' })
  @Version('1')
  createTicket(
    @Body() createTicketDto: CreateTicketDto,
    // @Customer() customer: any
  ) {
    // if (!customer || !customer.id) {
    //   throw new BadRequestException('Customer information is required');
    // }
    const customer = {
      id: '67e288839901996033c0e70f',
    };

    if (!createTicketDto.customerId) {
      createTicketDto.customerId = customer.id;
    }

    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets with filtering and pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all tickets matching the criteria' })
  @Version('1')
  getTickets(@Query() queryTicketDto: QueryTicketDto) {
    return this.ticketsService.findAll(queryTicketDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the ticket' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Ticket not found' })
  @Version('1')
  getTicket(@Param('id') id: string) {
    return this.ticketsService.findOneById(id);
  }
}
