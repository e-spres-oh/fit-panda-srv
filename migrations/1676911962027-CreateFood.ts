import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFood1676911962027 implements MigrationInterface {
  name = 'CreateFood1676911962027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "food" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "kcal" integer NOT NULL, CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "food"`);
  }
}
