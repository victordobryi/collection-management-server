import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'comments',
})
export class Comments extends Model {
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
