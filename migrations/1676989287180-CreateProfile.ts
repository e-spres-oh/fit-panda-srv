import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfile1676989287180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "activity" character varying NOT NULL, "goal" character varying NOT NULL, "target" integer NOT NULL, CONSTRAINT "PK_7c94d8d3c21565b1735956218d9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile"`);
  }
}
