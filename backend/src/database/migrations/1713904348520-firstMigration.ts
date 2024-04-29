import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1713904348520 implements MigrationInterface {
    name = 'FirstMigration1713904348520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_Id" uuid, CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "total_price" integer NOT NULL, "ticket_price" integer NOT NULL, "yield" integer NOT NULL, "total_days" integer NOT NULL, "sold" integer NOT NULL, CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-to-deal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "user_Id" uuid, "deal_Id" uuid, CONSTRAINT "PK_9d244e13ae4ebf3d07db69f80af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_ac12fed3e639b63f566b7858201" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-to-deal" ADD CONSTRAINT "FK_949f6fb862d47404309f9a7332c" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-to-deal" ADD CONSTRAINT "FK_b2e0af2c0a0cc05321433962952" FOREIGN KEY ("deal_Id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-to-deal" DROP CONSTRAINT "FK_b2e0af2c0a0cc05321433962952"`);
        await queryRunner.query(`ALTER TABLE "user-to-deal" DROP CONSTRAINT "FK_949f6fb862d47404309f9a7332c"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_ac12fed3e639b63f566b7858201"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user-to-deal"`);
        await queryRunner.query(`DROP TABLE "deals"`);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`);
    }

}
