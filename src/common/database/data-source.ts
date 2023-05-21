import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'production' ? 'dist/src/modules/**/*.model.js' : 'src/modules/**/*.model.ts',
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'src/common/database/migrations/*.js'
      : 'src/common/database/migrations/*.ts',
  ],
  subscribers: [
    process.env.NODE_ENV === 'production'
      ? 'dist/src/modules/**/*.subscriber.js'
      : 'src/modules/**/*.subscriber.ts',
  ],
});
