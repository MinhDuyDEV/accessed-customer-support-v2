import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { Module } from '@nestjs/common';
import { ActivitiesRepository } from 'src/core/repositories/activities.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }])],
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService,
    { provide: 'ActivitiesRepositoryInterface', useClass: ActivitiesRepository },
  ],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
