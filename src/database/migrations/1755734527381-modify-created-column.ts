import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCreatedColumn1755734627004 implements MigrationInterface {
    name = 'ModifyCreatedColumn1755734627004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(1024)`);
    }

}
