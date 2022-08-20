import { MigrationInterface, QueryRunner } from "typeorm";

export class decor1661014368283 implements MigrationInterface {
    name = 'decor1661014368283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918"`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" DROP CONSTRAINT "FK_7549e39dc0b51ab3a6edb6cafcf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7549e39dc0b51ab3a6edb6cafc"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_758b8ce7c18b9d347461b30228d"`);
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" RENAME COLUMN "userId" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" RENAME CONSTRAINT "PK_1687c4a5012744d4177a46c9cd0" TO "PK_994a53123fdcf64aaf5a8940e1c"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "user_token_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "PK_76505e49c0b6e026282f4b46161" PRIMARY KEY ("user_token_id")`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "ip" character varying`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "userUserId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_74ab03d49eb8d883f23f1feb7e" ON "user_communes_commune" ("userUserId") `);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "FK_624156deaa65fac5fa6f9fffaf4" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" ADD CONSTRAINT "FK_74ab03d49eb8d883f23f1feb7e9" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_communes_commune" DROP CONSTRAINT "FK_74ab03d49eb8d883f23f1feb7e9"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_624156deaa65fac5fa6f9fffaf4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74ab03d49eb8d883f23f1feb7e"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "ip"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "PK_76505e49c0b6e026282f4b46161"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "user_token_id"`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" RENAME CONSTRAINT "PK_994a53123fdcf64aaf5a8940e1c" TO "PK_1687c4a5012744d4177a46c9cd0"`);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" RENAME COLUMN "userUserId" TO "userId"`);
        await queryRunner.query(`ALTER SEQUENCE "user_user_id_seq" RENAME TO "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user_id" TO "id"`);
        await queryRunner.query(`CREATE INDEX "IDX_7549e39dc0b51ab3a6edb6cafc" ON "user_communes_commune" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_communes_commune" ADD CONSTRAINT "FK_7549e39dc0b51ab3a6edb6cafcf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
