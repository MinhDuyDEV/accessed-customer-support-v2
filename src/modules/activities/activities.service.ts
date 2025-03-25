import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Activity } from './schemas/activity.schema';
import { ActivitiesRepositoryInterface } from 'src/core/repositories/interfaces/activities.interface';

@Injectable()
export class ActivitiesService extends BaseServiceAbstract<Activity> {
  constructor(
    @Inject('ActivitiesRepositoryInterface')
    private readonly activitiesRepository: ActivitiesRepositoryInterface,
  ) {
    super(activitiesRepository);
  }
}
