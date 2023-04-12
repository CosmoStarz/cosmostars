import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', createdAt: 'created_at', updatedAt: 'updated_at' })
export class User extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  ya_id!: number;

  @AllowNull(false)
  @Column
  login!: string;

  @Column
  display_name!: string;

  @Column
  avatar!: string;
}
