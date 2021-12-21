import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
