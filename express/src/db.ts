import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'
dotenv.config()

const mySequelize = new Sequelize({
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  username: process.env.USERNAME,
  password: process.env.USER_PASS,
  dialect: 'mysql', // or 'mysql' for MySQL
  //Specify the path to your models
  // Add each model to the sequelize instance
  models: [__dirname + '/models'],
});

export default mySequelize;