import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto);
  }
  //----------------------------------------------------------------
  async getTaskById(id: string): Promise<Task> {
    const result = await this.tasksRepository.getTaskById(id);
    if (!result) throw new NotFoundException('شناسه تسک نامعتبر است.');
    return result;
  }
  //----------------------------------------------------------------
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const result = await this.tasksRepository.createTask(createTaskDto);
    if (!result) throw new BadRequestException('بروز خطا');
    return result;
  }
  //----------------------------------------------------------------
  // deleteTask(id: string) {
  //   const result = this.tasks.findIndex((task) => task.id == id);
  //   if (result === -1) return result;
  //   this.tasks.splice(result, 1);
  //   return {
  //     statusCode: 200,
  //     message: 'درخواست انجام شد',
  //   };
  // }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    console.log(result);

    if (result.affected < 1)
      throw new NotFoundException('شناسه تسک نامعتبر است');
  }
  //----------------------------------------------------------------
  async updateTaskStatus(id, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const { status } = updateTaskDTO;
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
