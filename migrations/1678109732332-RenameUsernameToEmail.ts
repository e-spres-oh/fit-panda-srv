import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUsernameToEmail1678109732332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "username" TO "email"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "email" TO "username"`,
    );
  }
}
