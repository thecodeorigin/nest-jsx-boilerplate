import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "../payload/jwt.payload";
import { UsersService } from "src/app/users/service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.getOneNoPassword({
      where: { id: payload.id }
    })
    if (!user) throw new UnauthorizedException()
    return user
  }
}
