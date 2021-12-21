import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { UpdateTaskDTO } from './dto/update-task.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get('/list')
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/info/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   const result = this.tasksService.getTaskById(id);
  //   if (!result) {
  //     throw new NotFoundException('شناسه تسک نامعتبر است');
  //   }

  //   return result;
  // }

  // @Post('create')
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/delete/:id')
  // deleteTask(@Param('id') id: string): any {
  //   const result = this.tasksService.deleteTask(id);
  //   if (result === -1)
  //     throw new NotFoundException('شناسه وارد شده نامعتبر است');

  //   return result;
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskDTO: UpdateTaskDTO,
  // ): Task {
  //   const { status } = updateTaskDTO;
  //   const result = this.tasksService.updateTaskStatus(id, status);
  //   if (result === -1) throw new BadRequestException('شناسه تسک نامعتبر است');

  // return result;
  // }
}
