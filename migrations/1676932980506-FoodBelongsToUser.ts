import { MigrationInterface, QueryRunner } from 'typeorm';

export class FoodBelongsToUser1676932980506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "food" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "food" ADD CONSTRAINT "FK_5d5c5e9c7c5f0b1e5e2a5f1b7c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food" DROP CONSTRAINT "FK_5d5c5e9c7c5f0b1e5e2a5f1b7c1"`,
    );
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "user_id"`);
  }
}
