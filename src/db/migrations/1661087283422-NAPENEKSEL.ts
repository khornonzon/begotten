import { MigrationInterface, QueryRunner } from "typeorm";

export class NAPENEKSEL1661087283422 implements MigrationInterface {
    name = 'NAPENEKSEL1661087283422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "direct_debt" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "direct_debt_id" SERIAL NOT NULL, "lender_id" integer, "borrower_id" integer, "debt_sum" integer, "commune_id" integer, "lenderUserUserId" integer, "borrowerUserUserId" integer, "communeCommuneId" integer, CONSTRAINT "PK_d3ed158723aabb9e65470846f6c" PRIMARY KEY ("direct_debt_id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "payment_id" SERIAL NOT NULL, "description" character varying, "commune_id" integer, "user_id" integer, "payment_sum" integer, "userUserId" integer, "communeCommuneId" integer, CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY ("payment_id"))`);
        await queryRunner.query(`ALTER TABLE "commune" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "direct_debt" ADD CONSTRAINT "FK_934ab2688dc6e56d613a5987b8c" FOREIGN KEY ("lenderUserUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "direct_debt" ADD CONSTRAINT "FK_7bb467004fcb547282a0e4db5f2" FOREIGN KEY ("borrowerUserUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "direct_debt" ADD CONSTRAINT "FK_b29c831aeb35449381daf6f735e" FOREIGN KEY ("communeCommuneId") REFERENCES "commune"("commune_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_3860e50cab67d6789f9ea4fd258" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_a28fe0ab8389f87eb9e4f4d1f90" FOREIGN KEY ("communeCommuneId") REFERENCES "commune"("commune_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_a28fe0ab8389f87eb9e4f4d1f90"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_3860e50cab67d6789f9ea4fd258"`);
        await queryRunner.query(`ALTER TABLE "direct_debt" DROP CONSTRAINT "FK_b29c831aeb35449381daf6f735e"`);
        await queryRunner.query(`ALTER TABLE "direct_debt" DROP CONSTRAINT "FK_7bb467004fcb547282a0e4db5f2"`);
        await queryRunner.query(`ALTER TABLE "direct_debt" DROP CONSTRAINT "FK_934ab2688dc6e56d613a5987b8c"`);
        await queryRunner.query(`ALTER TABLE "commune" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "direct_debt"`);
    }

}
