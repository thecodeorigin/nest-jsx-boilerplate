import { User } from "@app/users/index.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityChild } from "src/app/Base/Entity/index.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
}
