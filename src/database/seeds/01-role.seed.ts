import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const insertedData = [{ name: "USER" }, { name: "ADMIN" }, { name: "GUEST" }]
    await connection
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values(insertedData)
      .execute()
  }
}
