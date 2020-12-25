import { COMPONENTS, PERMISSIONS } from "@common/constants/permission";
import { getAllPermissionIdsByComponent, getPermissionIdsByPermissionWrappers } from "@common/helpers/seeder";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

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
    for (const id of ids) {
      rp.push({ roleId: 1, permissionId: id})
    }
    return rp
  }

  private async genAdminRP(connection: Connection): Promise<Array<{ roleId: number, permissionId: number }>> {
    let ids: number[] = []
    const rp = []
    for (const component in COMPONENTS) {
      const componentIds = await getAllPermissionIdsByComponent(component, connection)
      ids = ids.concat(componentIds)
    }
    for (const id of ids) {
      rp.push({ roleId: 2, permissionId: id })
    }
    return rp
  }
}
