import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForgotToken1714062169900 implements MigrationInterface {
    name = 'AddForgotToken1714062169900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forgot-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "forgotToken" text NOT NULL, "user_Id" uuid, CONSTRAINT "REL_eeaa6a7d209f0e21f048e7a20e" UNIQUE ("user_Id"), CONSTRAINT "PK_543b7c77386853a4c0c69b3ead3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "forgot-tokens" ADD CONSTRAINT "FK_eeaa6a7d209f0e21f048e7a20e5" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot-tokens" DROP CONSTRAINT "FK_eeaa6a7d209f0e21f048e7a20e5"`);
        await queryRunner.query(`DROP TABLE "forgot-tokens"`);
    }

}
