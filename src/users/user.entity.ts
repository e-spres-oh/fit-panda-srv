import Food from '../foods/food.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDTO {
  username: string;
  password: string;
}

export class UserDTO {
  id: number;
  username: string;
}

@Entity()
class User {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Food, (food) => food.user)
  foods: Food[];
}

export default User;
