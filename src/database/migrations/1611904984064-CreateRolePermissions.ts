import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRolePermissions1611904984064 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'roleId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'permissionId',
            type: 'int',
            isPrimary: true,
          }
        ]
      }))
      await queryRunner.createForeignKey(
        'role_permissions',
        new TableForeignKey({
          columnNames: ['roleId'],
          referencedTableName: 'roles',
          referencedColumnNames: ['id'],
        })
      )
      await queryRunner.createForeignKey(
        'role_permissions',
        new TableForeignKey({
          columnNames: ['permissionId'],
          referencedTableName: 'permissions',
          referencedColumnNames: ['id'],
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('role_permissions')
    }
}
