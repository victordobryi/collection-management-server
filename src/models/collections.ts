import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'collections',
})
export class Collections extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  theme!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img!: string;
}
