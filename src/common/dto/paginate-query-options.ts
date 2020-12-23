import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsInt, IsOptional } from "class-validator"

export class PaginateQueryOptions {
  @ApiPropertyOptional({ example: 1 })
  @Transform(parseInt)
  @IsOptional()
  @IsInt()
  page: number

  @ApiPropertyOptional({ example: 10 })
  @Transform(parseInt)
  @IsOptional()
  @IsInt()
  limit: number
}
