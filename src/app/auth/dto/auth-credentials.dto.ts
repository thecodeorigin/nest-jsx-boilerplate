import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
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
}
