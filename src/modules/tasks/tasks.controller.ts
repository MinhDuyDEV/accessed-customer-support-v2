import { Controller, Get, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllResponse } from 'src/common/types/common.type';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@ApiTags('task')
@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Get all tasks successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Version('1')
  async getTasks(): Promise<FindAllResponse<Task>> {
    return this.tasksService.findAll();
  }
}
