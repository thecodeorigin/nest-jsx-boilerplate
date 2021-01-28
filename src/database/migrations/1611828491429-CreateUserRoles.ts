import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserRoles1611828491429 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'user_roles',
        columns: [
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'roleId',
            type: 'int',
          }
        ]
      }))
      await queryRunner.createForeignKey(
        'user_roles',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
        })
      )
      await queryRunner.createForeignKey(
        'user_roles',
        new TableForeignKey({
          columnNames: ['roleId'],
          referencedTableName: 'roles',
          referencedColumnNames: ['id'],
        })
      )
      
      /* Cannot use Promise.all() for creating FKs, each FK must be finished before execute another */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_roles')
    }
}
