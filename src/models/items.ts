import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'items',
})
export class Items extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  likes!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  createTime!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  additionalInputs!: string;
}
