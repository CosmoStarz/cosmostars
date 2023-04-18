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

import { Comment } from "./Comment";
import { User } from "./User";

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
    type: DataTypes.INTEGER,
  })
  comments_count!: number;

  @ForeignKey(() => User)
  @Column(DataTypes.INTEGER)
  author_id!: string;

  @BelongsTo(() => User)
  author!: User;

  @CreatedAt
  creation_date!: Date;
}
