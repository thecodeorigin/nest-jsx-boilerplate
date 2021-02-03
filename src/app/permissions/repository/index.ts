import { BaseRepository } from "@app/Template/Base/Repository";
import { EntityRepository } from "typeorm";
import { Permission } from "../index.entity"

@EntityRepository(Permission)
export class PermissionsRepository extends BaseRepository<Permission> {
}
