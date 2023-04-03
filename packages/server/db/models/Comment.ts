import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { Like } from "./Like";
import { Topic } from "./Topic";

@Table({
  tableName: "comments",
  updatedAt: false,
})
export class Comment extends Model {
  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  comment!: string;

  @ForeignKey(() => Topic)
  @Column
  topic_id!: number;

  @BelongsTo(() => Topic)
  topic!: Topic;

  @ForeignKey(() => Comment)
  @Column
  parent_id!: number;

  @BelongsTo(() => Comment)
  parent!: Comment;

  @HasMany(() => Comment)
  replies!: Comment[];

  @HasMany(() => Like)
  likes!: Like[];

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  })
  author_id!: string;

  @CreatedAt
  creation_date!: Date;
}
