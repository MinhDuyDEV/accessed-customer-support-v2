import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Priority, TicketStatus, TicketType } from 'src/common/enums/ticket.enum';

export class QueryTicketDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: '1',
    required: false,
    default: '1',
  })
  @IsNumberString()
  @IsOptional()
  page?: string;

  @ApiProperty({
    description: 'Number of items per page',
    example: '10',
    required: false,
    default: '10',
  })
  @IsNumberString()
  @IsOptional()
  limit?: string;

  @ApiProperty({
    description: 'Sort field',
    example: 'createdAt',
    required: false,
    default: 'createdAt',
  })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({
    description: 'Sort order (asc or desc)',
    example: 'desc',
    required: false,
    default: 'desc',
  })
  @IsString()
  @IsOptional()
  order?: string;

  @ApiProperty({
    description: 'Filter by ticket status',
    enum: TicketStatus,
    required: false,
  })
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Filter by ticket type',
    enum: TicketType,
    required: false,
  })
  @IsEnum(TicketType)
  @IsOptional()
  ticketType?: string;

  @ApiProperty({
    description: 'Filter by priority',
    enum: Priority,
    required: false,
  })
  @IsEnum(Priority)
  @IsOptional()
  priority?: string;

  @ApiProperty({
    description: 'Filter by assigned agent ID',
    example: 'AGENT-456',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignedTo?: string;

  @ApiProperty({
    description: 'Filter by customer ID',
    example: 'CUST-123',
    required: false,
  })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({
    description: 'Search term for subject or message',
    example: 'defective',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
