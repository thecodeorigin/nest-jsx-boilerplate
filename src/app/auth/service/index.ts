import { compare } from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/app/users/service';
import { JwtPayload } from '../payload/jwt.payload';
import { AuthResult } from '../dto/auth-result.dto';
import { CreateUserDto } from '@app/users/dto/create.dto';
import { User } from '@app/users/index.entity';
import { RolesService } from '@app/roles/service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  login(user: any): AuthResult {
    const { id, email } = user
    const payload: JwtPayload = { id, email }
    const token: string = this.jwtService.sign(payload)

    /* Flatten roles into permissions */
    user['permissions'] = RolesService.flattenRolesIntoPermissions(user['roles'])

    const auth: AuthResult = { token, user }
    return auth
  }

  async loginGoogle(userGoogle: any): Promise<AuthResult> {
    const currentUser = await this.usersService.findOne({ where: { email: userGoogle.email }})
    if (!currentUser) return this.signUpGoogle(userGoogle)
    return this.login(currentUser)
  }

  async signUp(dto: CreateUserDto): Promise<AuthResult> {
    const user = await this.usersService.createOne(null, dto)
    /* We don't want to show password to client */
    delete user['password']
    return this.login(user)
  }

  async signUpGoogle(dto: any): Promise<AuthResult> {
    const user = await this.usersService.createOneGoogle(dto)
    return this.login(user)
  }

  async getMe(id: any): Promise<User> {
    const user = await this.usersService.findOne(id)
    user['permissions'] = RolesService.flattenRolesIntoPermissions(user['roles'])
    
    return user
  }
  
  async validateUser(email: string, password: string) {
    const user = await this.usersService.getOneAllProps({ where: { email }})
    if (user && await compare(password, user.password))
      return UsersService.getUsersWithoutPassword(user)
    else return null;
  }
}
