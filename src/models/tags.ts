import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'tags',
})
export class Tags extends Model {
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
  name!: string;
}
