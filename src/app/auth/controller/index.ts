import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { CreateUserDto } from '../../users/dto/create.dto';
import { AuthService } from '../service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AuthResult } from '../dto/auth-result.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user by token' })
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: any): any {
    return user
  }
  
  @ApiOperation({ summary: 'Login with email & password' })
  @ApiBody({ type: AuthCredentialsDto })
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@GetUser() user: any): AuthResult {
    return this.authService.login(user)
  }

  @ApiOperation({ summary: 'Sign up User' })
  @Post('/signup')
  async signUp(
    @Body() dto: CreateUserDto
  ): Promise<AuthResult> {
    return this.authService.signUp(dto)
  }
}
