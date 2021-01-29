import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePermissions1611904413589 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'component',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'action',
            type: 'varchar',
            length: '255',
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
      await queryRunner.dropTable('permissions')
    }
}
