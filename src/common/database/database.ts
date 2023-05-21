import { AppDataSource } from './data-source';

export const startDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.log(error, 'Error connecting to database');
    throw error;
  }
};

