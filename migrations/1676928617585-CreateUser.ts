import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1676928617585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_8d93d6e9c26205a1935956218ab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user`);
  }
}
