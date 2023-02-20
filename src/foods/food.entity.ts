import Photo from '../photos/photo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Photo)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;
}

export default Food;
