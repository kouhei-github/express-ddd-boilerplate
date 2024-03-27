import { Table, Column, DataType,Model} from 'sequelize-typescript';

export interface UserI {
  id: number
  email: string
  password: string
  salt: string
  userName: string
  sessionToken: string
}

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

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  userName!: string
}