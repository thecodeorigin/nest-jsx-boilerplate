import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, MaxLength } from "class-validator"

export class UpdateSelfUserDto {
  @ApiPropertyOptional({ example: 'Name' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string

  @ApiPropertyOptional({ example: '0123456789' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone: string

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  password: string

  @ApiPropertyOptional({ example: 'Danang, Vietnam' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address: string

  @ApiPropertyOptional({ example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlUbAyS_643dq_B69jZAlPNW6_Xc7SLELY6SpRsc5OI2wHiiYG&usqp=CAU' })
  @IsOptional()
  @IsString()
  avatar: string

  @ApiPropertyOptional({ example: 'Bio' })
  @IsOptional()
  @IsString()
  bio: string
}
