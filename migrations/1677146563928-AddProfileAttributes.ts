import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileAttributes1677146563928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "name" character varying NOT NULL DEFAULT 'John Doe'`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "age" integer NOT NULL DEFAULT 18`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "sex" character varying NOT NULL DEFAULT 'male'`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "weight" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "height" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "sex"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "name"`);
  }
}
