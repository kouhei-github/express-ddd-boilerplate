import { Table, Column, DataType,Model} from 'sequelize-typescript';

@Table({
  timestamps: true ,
  tableName: "users",
  modelName: "User"
})

export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  salt!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  sessionToken!: string
}