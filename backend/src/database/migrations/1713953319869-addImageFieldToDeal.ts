import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageFieldToDeal1713953319869 implements MigrationInterface {
    name = 'AddImageFieldToDeal1713953319869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "image"`);
    }

}
