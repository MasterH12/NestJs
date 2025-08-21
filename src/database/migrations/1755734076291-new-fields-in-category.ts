import { MigrationInterface, QueryRunner } from "typeorm";

export class NewFieldsInCategory1755734076291 implements MigrationInterface {
    name = 'NewFieldsInCategory1755734076291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(1024)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }

}
