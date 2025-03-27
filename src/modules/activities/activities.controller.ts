import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}
}
