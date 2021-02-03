import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsOptional } from "class-validator"

export class CreateTreeExampleDto {
  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  parentId: number
}