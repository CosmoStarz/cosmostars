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

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  status!: boolean;

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
