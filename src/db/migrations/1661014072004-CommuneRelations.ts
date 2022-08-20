import { MigrationInterface, QueryRunner } from "typeorm";

export class CommuneRelations1661014072004 implements MigrationInterface {
    name = 'CommuneRelations1661014072004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "commune" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "commune_id" SERIAL NOT NULL, CONSTRAINT "PK_76a939174e76aa9f5599f73d053" PRIMARY KEY ("commune_id"))`);
        await queryRunner.query(`CREATE TABLE "user_communes_commune" ("userId" integer NOT NULL, "communeCommuneId" integer NOT NULL, CONSTRAINT "PK_1687c4a5012744d4177a46c9cd0" PRIMARY KEY ("userId", "communeCommuneId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7549e39dc0b51ab3a6edb6cafc" ON "user_communes_commune" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_df3afa304d218e8db8e4859b58" ON "user_communes_commune" ("communeCommuneId") `);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" ADD CONSTRAINT "FK_7549e39dc0b51ab3a6edb6cafcf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" ADD CONSTRAINT "FK_df3afa304d218e8db8e4859b583" FOREIGN KEY ("communeCommuneId") REFERENCES "commune"("commune_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_communes_commune" DROP CONSTRAINT "FK_df3afa304d218e8db8e4859b583"`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" DROP CONSTRAINT "FK_7549e39dc0b51ab3a6edb6cafcf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df3afa304d218e8db8e4859b58"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7549e39dc0b51ab3a6edb6cafc"`);
        await queryRunner.query(`DROP TABLE "user_communes_commune"`);
        await queryRunner.query(`DROP TABLE "commune"`);
    }

}
