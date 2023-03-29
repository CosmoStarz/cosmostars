import { DataTypes } from "sequelize";
import {
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
}
