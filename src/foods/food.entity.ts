import Photo from './photos/photo.entity';
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
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateFoodDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  kcal: number;

  @IsOptional()
  @IsDateString()
  consumedAt: Date;

  @Exclude()
  photoId: number | null;
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
  photoId: number | null;

  @ApiHideProperty()
  @OneToOne(() => Photo)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo | null;

  @Column({ name: 'user_id' })
  userId: number;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.foods)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Food;
