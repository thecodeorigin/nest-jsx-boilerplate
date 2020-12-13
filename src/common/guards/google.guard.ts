import { ErrorMessage } from '@common/enums/error-message.enum';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from "google-auth-library"
import { GOOGLE_CLIENT_ID } from '../environments'

@Injectable()
export class AuthGoogleGuard implements CanActivate {
  async verify(idToken: string, request): Promise<boolean> {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID)
    
    try {
      const ticket = await client
        .verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })
      const payload = ticket.getPayload()
      request.googleUser = {
        sub: payload.sub, 
        email: payload.email, 
        email_verified: payload.email_verified, 
        name: payload.name, 
        given_name: payload.given_name, 
        family_name: payload.family_name, 
        avatar: payload.picture 
      }
      return true
    } 
    catch (error) {
      console.log(error)
      return false
    }
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idToken: string = request.body.idtoken
    if (!idToken) throw new UnauthorizedException(ErrorMessage.NO_TOKEN_PROVIDED)

    return this.verify(idToken, request)
  }
}
