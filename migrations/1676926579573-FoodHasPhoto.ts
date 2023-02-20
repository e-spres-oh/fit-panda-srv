import { MigrationInterface, QueryRunner } from 'typeorm';

export class FoodHasPhoto1676926579573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "food" ADD "photo_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "food" ADD CONSTRAINT "FK_5f9c9a1d4a5b8c5f5f9e9c9a1d4" FOREIGN KEY ("photo_id") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food" DROP CONSTRAINT "FK_5f9c9a1d4a5b8c5f5f9e9c9a1d4"`,
    );
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "photo_id"`);
  }
}
