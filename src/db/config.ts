import { Sequelize } from 'sequelize-typescript';
import { Users } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: false,
  models: [Users],
});

export default connection;
