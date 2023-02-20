import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConsumedAtToFood1676925781491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food" ADD "consumed_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "consumed_at"`);
  }
}
