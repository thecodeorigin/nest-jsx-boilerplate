import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ErrorMessage } from "../enums/error-message.enum"

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any): any {
    if (info?.message === 'No auth token')
      throw new UnauthorizedException(ErrorMessage.NO_TOKEN_PROVIDED)
    if (info?.message === 'jwt expired')
      throw new UnauthorizedException(ErrorMessage.TOKEN_EXPIRED)
    if (info?.message) 
      throw new UnauthorizedException()
    if (!user)
      throw new UnauthorizedException(ErrorMessage.INVALID_USER)
    return user
  }
}
