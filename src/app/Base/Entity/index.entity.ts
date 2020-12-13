import { ApiProperty } from "@nestjs/swagger";
import { 
  BaseEntity, 
  CreateDateColumn, 
  DeleteDateColumn, 
  UpdateDateColumn 
} from "typeorm";

export class BaseEntityChild extends BaseEntity {
  @ApiProperty({ readOnly: true })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({ readOnly: true })
  @DeleteDateColumn({ nullable: true })
  public deletedAt: Date;
}
