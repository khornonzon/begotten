import { MigrationInterface, QueryRunner } from "typeorm";

export class NAPENEKSEL21661093311026 implements MigrationInterface {
    name = 'NAPENEKSEL21661093311026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commune" ADD "creatorUserId" integer`);
        await queryRunner.query(`ALTER TABLE "commune" ADD CONSTRAINT "FK_67f3fd0a86ffee63a32c873dea0" FOREIGN KEY ("creatorUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commune" DROP CONSTRAINT "FK_67f3fd0a86ffee63a32c873dea0"`);
        await queryRunner.query(`ALTER TABLE "commune" DROP COLUMN "creatorUserId"`);
    }

}
