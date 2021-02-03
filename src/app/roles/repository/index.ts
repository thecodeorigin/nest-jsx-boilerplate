import { BaseRepository } from "@app/Template/Base/Repository";
import { EntityRepository } from "typeorm";
import { Role } from "../index.entity"

@EntityRepository(Role)
export class RolesRepository extends BaseRepository<Role> {
}
