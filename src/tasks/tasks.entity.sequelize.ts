import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { TaskStatus } from './task-status.enum';

@Table
export class Task extends Model {
  @Column({
    type: DataType.STRING(128),
    allowNull: true,
    defaultValue: 'Title',
    comment: 'عنوان',
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'توضیحات',
  })
  description: string;

  @Column({
    type: DataType.ENUM('FINISHED', 'UNFINISHED'),
    allowNull: true,
    defaultValue: 'UNFINISHED',
    comment: 'وضعیت',
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'شناسه کاربر',
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
