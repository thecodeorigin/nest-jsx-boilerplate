import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetGoogleUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.googleUser;
  },
);
