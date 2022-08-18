import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1660827947168 implements MigrationInterface {
    name = 'firstMigration1660827947168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "albumTitle" character varying NOT NULL, "zhopas" character varying NOT NULL, "theme" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
