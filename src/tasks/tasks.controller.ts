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
  UseGuards,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service.sequelize';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './tasks.entity.sequelize';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/users.get-user-decorator';
import { User } from 'src/users/users.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // constructor(private tasksService: TasksService) {}
  constructor(private tasksService: TasksService) {}

  @Get('/list')
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/info/:id')
  getTaskById(@Param('id') id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post('create')
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/delete/:id')
  deleteTask(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Put('/update')
  updateTaskStatus(
    @Body() updateTaskDTO: UpdateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(updateTaskDTO, user);
  }
}
