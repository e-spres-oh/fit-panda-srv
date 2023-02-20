import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Food;
