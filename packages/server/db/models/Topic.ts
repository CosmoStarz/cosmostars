import { DataTypes } from "sequelize";
import { Column, CreatedAt, HasMany, Model, Table } from "sequelize-typescript";

import { Comment } from "./Comment";

@Table({
  tableName: "topics",
  updatedAt: false,
})
export class Topic extends Model {
  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  description!: string;

  @HasMany(() => Comment)
  comments!: Comment[];

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  })
  author_id!: string;

  @CreatedAt
  creation_date!: Date;
}
