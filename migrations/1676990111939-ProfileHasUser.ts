import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileHasUser1676990111939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_8d93d6e9c26205a1935956218ab" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_8d93d6e9c26205a1935956218ab"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_id"`);
  }
}
