import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string

  @ApiProperty({ example: '123456789' })
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  password: string

  @ApiProperty({ example: 'Name' })
  @IsString()
  @MaxLength(255)
  name: string

  @ApiProperty({ example: '0123456789' })
  @IsString()
  @MinLength(10)
  @MaxLength(11)
  phone: string

  @ApiPropertyOptional({ example: 'address' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address: string

  @ApiPropertyOptional({ example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlUbAyS_643dq_B69jZAlPNW6_Xc7SLELY6SpRsc5OI2wHiiYG&usqp=CAU' })
  @IsOptional()
  @IsString()
  avatar: string

  @ApiProperty({ example: 'Bio' })
  @IsString()
  bio: string
}
