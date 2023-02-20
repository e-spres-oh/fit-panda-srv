import Photo from '../photos/photo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../users/user.entity';
import { ApiHideProperty, PartialType } from '@nestjs/swagger';

export class CreateFoodDTO {
  name: string;
  kcal: number;
  consumedAt: Date;
  photoId: number;
}

export class UpdateFoodDTO extends PartialType(CreateFoodDTO) {}

@Entity()
class Food {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column()
  name: string;

  @Column()
  kcal: number;

  @Column({ type: 'timestamp', name: 'consumed_at' })
  consumedAt: Date;

  @Column({ name: 'photo_id' })
  photoId: number;

  @ApiHideProperty()
  @OneToOne(() => Photo)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;

  @Column({ name: 'user_id' })
  userId: number;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.foods)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Food;
