import { PERMISSIONS } from "@common/constants/permission";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const insertedData = [];
    Object.keys(PERMISSIONS).forEach(component => {
      const obj = PERMISSIONS[component]
      Object.keys(obj).forEach(key => {
        insertedData.push({
          component,
          action: obj[key].action
        })
      })
    })

    await connection
      .createQueryBuilder()
      .insert()
      .into('permissions')
      .values(insertedData)
      .execute()
  }
}
