import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import User from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Activity {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum Goal {
  LOSE_WEIGHT = 'LOSE_WEIGHT',
  MAINTAIN_WEIGHT = 'MAINTAIN_WEIGHT',
  GAIN_WEIGHT = 'GAIN_WEIGHT',
}

export class CreateProfileDTO {
  activity: Activity;
  goal: Goal;
  target: number;
  name: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  userId: number;
}

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}

@Entity()
class Profile {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: Activity,
    default: Activity.MODERATE,
  })
  activity: Activity;

  @Column({
    type: 'enum',
    enum: Goal,
    default: Goal.MAINTAIN_WEIGHT,
  })
  goal: Goal;

  @Column()
  target: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ApiHideProperty()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Profile;
