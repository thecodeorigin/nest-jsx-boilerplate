import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsOptional } from "class-validator"

export class UpdateTreeExampleDto {
  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  parentId: number
}