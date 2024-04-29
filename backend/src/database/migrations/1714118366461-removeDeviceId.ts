import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDeviceId1714118366461 implements MigrationInterface {
    name = 'RemoveDeviceId1714118366461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP COLUMN "deviceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD "deviceId" text NOT NULL`);
    }

}
