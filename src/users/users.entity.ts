import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Task } from '../tasks/tasks.entity.sequelize';
@Table
export class User extends Model {
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    comment: 'نام',
  })
  firstName: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    comment: 'نام خانوادگی',
  })
  lastName: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    unique: true,
    comment: 'نام کاربری',
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'گذرواژه',
  })
  password: string;

  @HasMany(() => Task)
  task: Task;
}
