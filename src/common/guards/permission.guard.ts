import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}

  matchPermission(access: any, permissions: Array<any>) {
    for (let i=0; i<permissions.length; i++) {
      if (
        permissions[i].component === access.component && 
        permissions[i].action === access.action
      ) {
        return true
      }
    }
    return false
  }
  
  canActivate(context: ExecutionContext): boolean {
    const access = this.reflector?.get<any>('permission', context.getHandler())
    if (!access) {
      return false
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
        
    /* Take permissions */
    const permissions = []
    for (const role of user.roles) {
      permissions.push(...role.permissions)
    }

    if (permissions.length === 0) return false
    return this.matchPermission(access, permissions)
  }
}
