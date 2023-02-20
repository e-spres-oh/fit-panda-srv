import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePhoto1676926319261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "filename" character varying NOT NULL, "content_type" character varying NOT NULL, "byte_size" integer NOT NULL, "checksum" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1f5f5d5e5a5b8c5f5f9e9c9a1d4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "photo"`);
  }
}
