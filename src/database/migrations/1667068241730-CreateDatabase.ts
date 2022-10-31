import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1667068241730 implements MigrationInterface {
    name = 'CreateDatabase1667068241730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`idProfessionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`professions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6ec15245b977513cbc3251fc4f8\` FOREIGN KEY (\`idProfessionId\`) REFERENCES \`professions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6ec15245b977513cbc3251fc4f8\``);
        await queryRunner.query(`DROP TABLE \`professions\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
