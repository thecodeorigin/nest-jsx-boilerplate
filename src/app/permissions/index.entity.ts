import { Role } from "@app/roles/index.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityChild } from "@app/Template/Base/Entity/index.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission extends BaseEntityChild {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ApiProperty({ type: String, example: 'USER' })
  @Column({ type: 'varchar', length: 255 })
  component: string
  
  @ApiProperty({ type: String, example: 'ALL' })
  @Column({ type: 'varchar', length: 255 })
  action: string

  @ManyToMany(() => Role, role => role.permissions, { eager: false })
  roles: Role[]
}
