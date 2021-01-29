import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1611827119197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'phone',
          type: 'varchar',
          length: '50',
          isNullable: true,
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'address',
          type: 'varchar',
          length: '255',
          isNullable: true,
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'bio',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          length: '6',
          default: 'CURRENT_TIMESTAMP(6)'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          length: '6',
          isNullable: true,
          default: null,
          onUpdate: "CURRENT_TIMESTAMP(6)"
        },
        {
          name: 'deletedAt',
          type: 'timestamp',
          length: '6',
          isNullable: true,
          default: null
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
