import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity.sequelize';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    // return await this.tasksRepository.getTasks(filterDto);

    const { search, status } = filterDto;

    const where = {};
    search ? (where[search] = search) : null;
    status ? (where[status] = status) : null;

    const result = await this.tasksRepository.findAll({ where, raw: true });
    return result;
  }
  async getTaskById(id: string): Promise<Task> {
    const result = await this.tasksRepository.findByPk(id, { raw: true });
    if (!result) throw new NotFoundException('شناسه تسک نامعتبر است.');
    return result;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const result = await this.tasksRepository.create(createTaskDto);
    if (!result) throw new BadRequestException('بروز خطا');
    return result;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.destroy({ where: { id } });

    if (!result) throw new NotFoundException('شناسه تسک نامعتبر است');

    return;
  }
  async updateTaskStatus(
    id: string,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    const { status } = updateTaskDTO;

    const task = await this.getTaskById(id);

    task.status = status;

    await this.tasksRepository.update(task, { where: { id } });

    return task;
  }
}
