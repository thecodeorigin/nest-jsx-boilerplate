import { Permission } from "@app/permissions/index.entity";
import { Role } from "@app/roles/index.entity";
import { Connection } from "typeorm";

export async function getAllPermissionIdsByComponent(
  component: any, 
  connection: Connection
): Promise<number[]> {
  const queryResult = await connection
    .createQueryBuilder()
    .from(Permission, 'permission')
    .where('permission.component = :component', { component })
    .select('permission.id')
    .getMany()
  const ids = queryResult.map(p => p.id)
  return ids
}

export async function getPermissionIdsByPermissionWrappers(
  permissions: any[],
  connection: Connection
): Promise<number[]> {
  const queries = []
  for (const permission of permissions) {
    queries.push(connection
      .createQueryBuilder()
      .from(Permission, 'permission')
      .andWhere('permission.component = :component', { component: permission.component })
      .andWhere('permission.action = :action', { action: permission.action })
      .select('permission.id')
      .getOne()
    )
  }
  const queryResult = await Promise.all(queries)
  const ids = queryResult.map(p => p.id)
  return ids
}

export async function getRoleIdByName(
  name: string,
  connection: Connection
): Promise<number> {
  const role = await connection
    .createQueryBuilder()
    .from(Role, 'role')
    .where('role.name = :name', { name })
    .select('role.id')
    .getOne()
  
  return role.id
}