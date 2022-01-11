import { Table, Column, Model } from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';

@Table
export class Task extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: TaskStatus;
}
