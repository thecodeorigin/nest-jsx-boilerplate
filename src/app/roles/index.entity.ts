import { Permission } from "@app/permissions/index.entity";
import { User } from "@app/users/index.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityChild } from "@app/Template/Base/Entity/index.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role extends BaseEntityChild {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ApiProperty({ example: 'ADMIN' })
  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  name: string

  @ManyToMany(() => User, user => user.roles, { eager: false })
  users: User[]

  @ManyToMany(() => Permission, permission => permission.roles, { eager: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' }
  })
  permissions: Permission[]
}
