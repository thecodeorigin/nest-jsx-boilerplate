import { COMPONENTS, PERMISSIONS } from "@common/constants/permission";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { 
  getAllPermissionIdsByComponent, 
  getPermissionIdsByPermissionWrappers,
  getRoleIdByName
} from "@common/helpers/seeder";

export default class CreateRolePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRP = await this.genUserRP(connection)
    const adminRP = await this.genAdminRP(connection)
    const rp = userRP.concat(adminRP)

    await connection
      .createQueryBuilder()
      .insert()
      .into('role_permissions')
      .values(rp)
      .execute()
  }

  private async genUserRP(connection: Connection): Promise<Array<{ roleId: number, permissionId: number }>> {
    const ids = await getPermissionIdsByPermissionWrappers(
      [
        PERMISSIONS.USER.READ_ALL,
        PERMISSIONS.USER.UPDATE_SELF
      ],
      connection
    )
    const rp = []
    const userRoleId: number = await getRoleIdByName('USER', connection)

    for (const id of ids) {
      rp.push({ roleId: userRoleId, permissionId: id})
    }
    return rp
  }

  private async genAdminRP(connection: Connection): Promise<Array<{ roleId: number, permissionId: number }>> {
    let ids: number[] = []
    const rp = []
    const adminRoleId: number = await getRoleIdByName('ADMIN', connection)

    for (const component in COMPONENTS) {
      const componentIds = await getAllPermissionIdsByComponent(component, connection)
      ids = ids.concat(componentIds)
    }
    for (const id of ids) {
      rp.push({ roleId: adminRoleId, permissionId: id })
    }
    return rp
  }
}
