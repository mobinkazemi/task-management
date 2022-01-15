import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDTO {
  id: number;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
