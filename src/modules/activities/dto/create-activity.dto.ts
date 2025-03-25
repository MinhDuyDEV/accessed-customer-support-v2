import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ActivityType } from '../schemas/activity.schema';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Type of activity',
    enum: ActivityType,
    example: ActivityType.NOTE_ADDED,
  })
  @IsEnum(ActivityType)
  type: ActivityType;

  @ApiProperty({
    description: 'Description of the activity',
    example: 'Added a note about customer requirements',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID of the ticket this activity belongs to',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsMongoId()
  ticket: string;

  @ApiProperty({
    description: 'ID of the user who performed the activity',
    example: '60d21b4967d0d8992e610c86',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  user?: string;

  @ApiProperty({
    description: 'Additional data related to the activity',
    example: { oldValue: 'Low', newValue: 'High' },
    required: false,
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
