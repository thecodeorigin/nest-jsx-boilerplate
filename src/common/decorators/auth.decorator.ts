import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { PermissionGuard } from "../guards/permission.guard";

/**
 * @Usage The main custom decorator to apply authentication and authorization logic
 */
export function Auth(permission) {
  return applyDecorators(
    SetMetadata('permission', permission),
    UseGuards(JwtAuthGuard), // these guards called twice, idk why :(
    UseGuards(PermissionGuard),
    ApiBearerAuth()
  )
}
