import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityChild } from "src/app/Base/Entity/index.entity";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('{{entity}}s')
export class Example extends BaseEntityChild {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number
}
