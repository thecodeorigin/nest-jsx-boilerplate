import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BaseEntityChild } from "src/app/Base/Entity/index.entity";
import { Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity('{{entity}}s')
@Tree("materialized-path")
export class TreeExample extends BaseEntityChild {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number
  
  @ApiProperty({ readOnly: true })
  @TreeChildren()
  @IsOptional()
  children: TreeExample[]
  
  @ApiProperty({ readOnly: true })
  @TreeParent()
  @IsOptional()
  parent: TreeExample
}
