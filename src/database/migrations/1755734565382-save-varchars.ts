import { MigrationInterface, QueryRunner } from "typeorm";

export class SaveVarchars1755734565382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "description" TYPE character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "description" TYPE character varying(1024)`);
    }

}
