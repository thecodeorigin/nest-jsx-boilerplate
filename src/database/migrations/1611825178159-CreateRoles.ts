import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoles1611825178159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'roles',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isUnique: true,
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
    await queryRunner.dropTable("roles")
  }
}
