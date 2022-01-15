import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Inject,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service.sequelize';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './tasks.entity.sequelize';

@Controller('tasks')
export class TasksController {
  // constructor(private tasksService: TasksService) {}
  constructor(private tasksService: TasksService) {}

  @Get('/list')
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/info/:id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/delete/:id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Put('/update')
  updateTaskStatus(@Body() updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    return this.tasksService.updateTaskStatus(updateTaskDTO);
  }
}
