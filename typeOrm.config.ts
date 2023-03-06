import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import Food from './src/foods/food.entity';
import { CreateFood1676911962027 } from './migrations/1676911962027-CreateFood';
import { AddConsumedAtToFood1676925781491 } from './migrations/1676925781491-AddConsumedAtToFood';
import { CreatePhoto1676926319261 } from './migrations/1676926319261-CreatePhoto';
import { FoodHasPhoto1676926579573 } from './migrations/1676926579573-FoodHasPhoto';
import Photo from './src/foods/photos/photo.entity';
import { CreateUser1676928617585 } from './migrations/1676928617585-CreateUser';
import User from './src/users/user.entity';
import { UniqueUsername1676930168814 } from './migrations/1676930168814-UniqueUsername';
import { FoodBelongsToUser1676932980506 } from './migrations/1676932980506-FoodBelongsToUser';
import { CreateProfile1676989287180 } from './migrations/1676989287180-CreateProfile';
import { ProfileHasUser1676990111939 } from './migrations/1676990111939-ProfileHasUser';
import { AddProfileAttributes1677146563928 } from './migrations/1677146563928-AddProfileAttributes';
import { RenameUsernameToEmail1678109732332 } from './migrations/1678109732332-RenameUsernameToEmail';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'fit_panda',
  entities: [Food, Photo, User],
  migrations: [
    CreateFood1676911962027,
    AddConsumedAtToFood1676925781491,
    CreatePhoto1676926319261,
    FoodHasPhoto1676926579573,
    CreateUser1676928617585,
    UniqueUsername1676930168814,
    FoodBelongsToUser1676932980506,
    CreateProfile1676989287180,
    ProfileHasUser1676990111939,
    AddProfileAttributes1677146563928,
    RenameUsernameToEmail1678109732332,
  ],
});
