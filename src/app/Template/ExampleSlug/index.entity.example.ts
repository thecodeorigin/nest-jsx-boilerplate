import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityChild } from "@app/Template/Base/Entity/index.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('{{entity}}s')
export class ExampleSlug extends BaseEntityChild {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  slug: string
}
