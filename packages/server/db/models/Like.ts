import { DataTypes } from "sequelize";
import {
  AfterCreate,
  AfterDestroy,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Comment } from "./Comment";
import { User } from "./User";

@Table({
  tableName: "likes",
  timestamps: false,
})
export class Like extends Model {
  @ForeignKey(() => Comment)
  @Column
  comment_id!: number;

  @BelongsTo(() => Comment)
  comment!: Comment;

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @AfterCreate
  static async addIncrementLikesCount(instance: Like) {
    const comment: Comment | null = await Comment.findByPk(instance.comment_id);
    await comment?.increment("likes_count");
  }

  @AfterDestroy
  static async decrementLikesCount(instance: Like) {
    const comment: Comment | null = await Comment.findByPk(instance.comment_id);
    await comment?.decrement("likes_count");
  }
}
