import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TicketType } from 'src/common/enums/ticket.enum';

export class CreateTicketDto {
  @IsOptional()
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'Subject of the ticket',
    example: 'Defective Item Received',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  subject: string;

  @ApiProperty({
    description: 'Message body of the ticket',
    example: 'I received a defective product and would like a replacement.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  message: string;

  @ApiProperty({
    description: 'Type of ticket',
    enum: TicketType,
    example: TicketType.INCIDENT,
    default: TicketType.INCIDENT,
  })
  @IsEnum(TicketType)
  @IsOptional()
  ticketType: string;

  @ApiProperty({
    description: 'Source of the ticket (web, email, phone, etc.)',
    example: 'web',
    default: 'web',
  })
  @IsString()
  @IsOptional()
  source?: string;
}
