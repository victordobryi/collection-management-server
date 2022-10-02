import { Sequelize } from 'sequelize-typescript';
import { Users } from '../models/users';
import { Tags } from '../models/tags';
import { Comments } from '../models/comments';
import { Collections } from '../models/collections';
import { Items } from '../models/items';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: false,
  models: [Users, Tags, Comments, Collections, Items],
});

export default connection;
