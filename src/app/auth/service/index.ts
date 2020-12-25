import { compare } from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/app/users/service';
import { JwtPayload } from '../payload/jwt.payload';
import { AuthResult } from '../dto/auth-result.dto';
import { CreateUserDto } from '@app/users/dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  login(user: any): AuthResult {
    const { id, email } = user
    const payload: JwtPayload = { id, email }
    const token = this.jwtService.sign(payload)
    const auth: AuthResult = { token, user }
    return auth
  }

  async signUp(dto: CreateUserDto): Promise<AuthResult> {
    const user = await this.usersService.createOne(null, dto)
    return this.login(user)
  }
  
  async validateUser(email: string, password: string) {
    const user = await this.usersService.getOneAllProps({ where: { email }})
    if (user && await compare(password, user.password))
      return UsersService.getUsersWithoutPassword(user)
    else return null;
  }
}
