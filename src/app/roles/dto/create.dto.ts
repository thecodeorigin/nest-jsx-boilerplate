import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds: number[]
}
