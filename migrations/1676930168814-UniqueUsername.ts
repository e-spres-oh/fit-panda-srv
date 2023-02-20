import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueUsername1676930168814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_8d93d6e9c26205a1935956218ab" UNIQUE ("username")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_8d93d6e9c26205a1935956218ab"`,
    );
  }
}
