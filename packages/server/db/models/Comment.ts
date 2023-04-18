import { DataTypes } from "sequelize";
import {
  AfterCreate,
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
import { User } from "./User";

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

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  author_id!: string;

  @BelongsTo(() => User)
  author!: User;

  @CreatedAt
  creation_date!: Date;

  @Column({
    type: DataTypes.INTEGER,
  })
  likes_count!: number;

  @AfterCreate
  static async addIncrementCommentsCount(instance: Comment) {
    const topic: Topic | null = await Topic.findByPk(instance.topic_id);
    await topic?.increment("comments_count");
  }
}
