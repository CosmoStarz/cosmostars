import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "themes",
  timestamps: false,
})
export class Theme extends Model {
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  theme!: string;
}
