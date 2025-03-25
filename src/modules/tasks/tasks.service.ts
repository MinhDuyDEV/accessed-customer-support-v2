import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Task } from './schemas/task.schema';
import { TasksRepositoryInterface } from 'src/core/repositories/interfaces/tasks.interface';

@Injectable()
export class TasksService extends BaseServiceAbstract<Task> {
  constructor(
    @Inject('TasksRepositoryInterface')
    private readonly tasksRepository: TasksRepositoryInterface,
  ) {
    super(tasksRepository);
  }
}
