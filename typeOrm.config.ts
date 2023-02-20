import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { CreateFood1676911962027 } from './migrations/1676911962027-CreateFood';
import Food from 'src/foods/food.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'fit_panda',
  entities: [Food],
  migrations: [CreateFood1676911962027],
});
