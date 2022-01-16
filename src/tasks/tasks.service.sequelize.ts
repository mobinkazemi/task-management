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
import { User } from 'src/users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const userId = user.id;

    const where = { userId };
    search ? (where[search] = search) : null;
    status ? (where[status] = status) : null;

    const result = await this.tasksRepository.findAll({ where, raw: true });
    return result;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const userId = user.id;
    const result = await this.tasksRepository.findOne({
      where: { id, userId },
      raw: true,
    });
    if (!result) throw new NotFoundException('شناسه تسک نامعتبر است.');
    return result;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const userId = user.id;
    const result = await this.tasksRepository.create({
      ...createTaskDto,
      userId,
    });
    if (!result) throw new BadRequestException('بروز خطا');
    return result;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const userId = user.id;
    const result = await this.tasksRepository.destroy({
      where: { id, userId },
    });

    if (!result) throw new NotFoundException('شناسه تسک نامعتبر است');

    return;
  }

  async updateTaskStatus(
    updateTaskDTO: UpdateTaskDTO,
    user: User,
  ): Promise<Task> {
    const { status, id } = updateTaskDTO;
    const userId = user.id;
    const [affected, task] = await this.tasksRepository.update(
      { status },
      { where: { id, userId }, returning: true },
    );

    if (!affected) throw new NotFoundException('شناسه تسک نامعتبر است');
    return task[0];
  }
}
