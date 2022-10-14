import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'likes',
})
export class Likes extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  likedUsers!: string;
}
